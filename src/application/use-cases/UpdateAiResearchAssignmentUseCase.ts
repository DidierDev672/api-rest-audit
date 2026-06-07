import { IAiResearchAssignmentRepository } from '../../domain/repositories/IAiResearchAssignmentRepository';
import {
  AiResearchAssignment,
  AiResearchAssignmentResponse,
  toAiResearchAssignmentResponse,
} from '../../domain/entities/AiResearchAssignmentEntity';
import { UpdateAiResearchAssignmentDTO } from '../../presentation/dto/AiResearchAssignmentDTO';
import { ValidationError } from '../../domain/errors/ValidationError';
import { Logger } from '../../infrastructure/logger/Logger';

/**
 * Permite al usuario continuar / pausar / cancelar la entrega de resultados
 * de una investigación asignada a la IA (responde a la pregunta del diálogo
 * "¿deseas seguir recibiendo resultados?").
 */
export class UpdateAiResearchAssignmentUseCase {
  constructor(
    private readonly repository: IAiResearchAssignmentRepository,
  ) {}

  async execute(
    id: string,
    data: UpdateAiResearchAssignmentDTO,
  ): Promise<AiResearchAssignmentResponse> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new ValidationError(`Asignación con ID ${id} no encontrada`);
    }

    const now = new Date();
    const patch: Partial<AiResearchAssignment> = {};

    if (data.recurrence !== undefined) patch.recurrence = data.recurrence;
    if (data.end_date !== undefined) patch.endDate = data.end_date;

    // El usuario decide si seguir recibiendo resultados.
    if (data.continue_delivery !== undefined) {
      patch.continueDelivery = data.continue_delivery;

      if (!data.continue_delivery) {
        patch.status = 'paused';
        patch.nextRunAt = null;
      } else if (this.canResume(existing, data.end_date)) {
        patch.status = 'pending';
        patch.nextRunAt = now;
        patch.lastError = null;
      }
    }

    // Cambios de estado explícitos.
    if (data.status !== undefined) {
      patch.status = data.status;
      if (data.status === 'pending') {
        patch.nextRunAt = now;
        patch.continueDelivery = true;
        patch.lastError = null;
      } else if (data.status === 'paused' || data.status === 'cancelled') {
        patch.nextRunAt = null;
        if (data.status === 'paused') patch.continueDelivery = false;
      }
    }

    Logger.info('Actualizando asignación de investigación IA', { id, patch });
    const updated = await this.repository.update(id, patch);
    Logger.success('Asignación de investigación IA actualizada', { id });

    return toAiResearchAssignmentResponse(updated);
  }

  private canResume(existing: AiResearchAssignment, newEndDate?: string): boolean {
    const endDate = newEndDate ?? existing.endDate;
    const today = new Date().toISOString().slice(0, 10);
    return endDate >= today;
  }
}
