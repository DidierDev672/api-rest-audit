import { IAiResearchAssignmentRepository } from '../../domain/repositories/IAiResearchAssignmentRepository';
import {
  AiResearchAssignmentResponse,
  toAiResearchAssignmentResponse,
} from '../../domain/entities/AiResearchAssignmentEntity';
import { AssignAiResearchDTO } from '../../presentation/dto/AiResearchAssignmentDTO';
import { Logger } from '../../infrastructure/logger/Logger';
import { v4 as uuidv4 } from 'uuid';

/**
 * Asigna una tarea/investigación del calendario a la IA para que la trabaje
 * durante el rango de fechas indicado. Calcula la primera ejecución
 * (`nextRunAt`) en función de `start_date`.
 */
export class AssignAiResearchUseCase {
  constructor(
    private readonly repository: IAiResearchAssignmentRepository,
  ) {}

  async execute(data: AssignAiResearchDTO): Promise<AiResearchAssignmentResponse> {
    const now = new Date();
    const nextRunAt = this.computeFirstRun(data.start_date, now);

    const assignment = {
      id: uuidv4(),
      ownerId: data.owner_id.trim(),
      calendarEventId: data.calendar_event_id ?? null,
      researchId: data.research_id ?? null,
      eventType: data.event_type,
      title: data.title.trim(),
      prompt: data.prompt.trim(),
      startDate: data.start_date,
      endDate: data.end_date,
      recurrence: data.recurrence ?? 'once',
      status: 'pending' as const,
      continueDelivery: true,
      model: data.model ?? null,
      nextRunAt,
      lastRunAt: null,
      completedAt: null,
      runsCount: 0,
      lastError: null,
      createdAt: now,
      updatedAt: now,
    };

    Logger.info('Asignando investigación a la IA', {
      id: assignment.id,
      ownerId: assignment.ownerId,
      nextRunAt: nextRunAt.toISOString(),
    });

    await this.repository.create(assignment);

    Logger.success('Investigación asignada a la IA', { id: assignment.id });

    return toAiResearchAssignmentResponse(assignment);
  }

  /** Si el rango ya comenzó, ejecuta cuanto antes; si no, al inicio del rango. */
  private computeFirstRun(startDate: string, now: Date): Date {
    const startOfRange = new Date(`${startDate}T00:00:00.000Z`);
    if (Number.isNaN(startOfRange.getTime()) || startOfRange <= now) {
      return now;
    }
    return startOfRange;
  }
}
