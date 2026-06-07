import { IAiResearchAssignmentRepository } from '../../domain/repositories/IAiResearchAssignmentRepository';
import { IAiResearchResultRepository } from '../../domain/repositories/IAiResearchResultRepository';
import { IAiModelCredentialRepository } from '../../domain/repositories/IAiModelCredentialRepository';
import { IResearchAiGateway } from '../../domain/ports/IResearchAiGateway';
import { AiResearchAssignment } from '../../domain/entities/AiResearchAssignmentEntity';
import { Logger } from '../../infrastructure/logger/Logger';
import { v4 as uuidv4 } from 'uuid';

export interface ProcessDueResearchResult {
  processed: number;
  succeeded: number;
  failed: number;
}

/**
 * Ejecuta las investigaciones asignadas a la IA que ya están vencidas:
 * llama al proveedor de IA, guarda el resultado (con mensaje psicológico) y
 * reprograma o finaliza la asignación según su recurrencia y rango de fechas.
 */
export class ProcessDueAiResearchAssignmentsUseCase {
  constructor(
    private readonly assignmentRepository: IAiResearchAssignmentRepository,
    private readonly resultRepository: IAiResearchResultRepository,
    private readonly credentialRepository: IAiModelCredentialRepository,
    private readonly aiGateway: IResearchAiGateway,
  ) {}

  async execute(limit = 25): Promise<ProcessDueResearchResult> {
    const due = await this.assignmentRepository.findDuePending(limit);
    Logger.info('Procesando investigaciones IA vencidas', { count: due.length });

    const summary: ProcessDueResearchResult = { processed: 0, succeeded: 0, failed: 0 };

    for (const assignment of due) {
      summary.processed += 1;
      await this.assignmentRepository.update(assignment.id, { status: 'processing' });

      try {
        const { apiKey, model } = await this.resolveCredentials(assignment);

        const output = await this.aiGateway.generate({
          title: assignment.title,
          prompt: assignment.prompt,
          eventType: assignment.eventType,
          apiKey,
          model,
        });

        await this.resultRepository.create({
          id: uuidv4(),
          assignmentId: assignment.id,
          ownerId: assignment.ownerId,
          title: assignment.title,
          content: output.content,
          psychologicalMessage: output.psychologicalMessage,
          model: output.model,
          seen: false,
          createdAt: new Date(),
        });

        await this.reschedule(assignment, output.model);
        summary.succeeded += 1;
      } catch (error) {
        const message = (error as Error).message;
        Logger.danger('Error al procesar investigación IA', {
          assignmentId: assignment.id,
          error: message,
        });
        await this.assignmentRepository.update(assignment.id, {
          status: 'failed',
          lastError: message,
          nextRunAt: null,
          lastRunAt: new Date(),
        });
        summary.failed += 1;
      }
    }

    Logger.success('Procesamiento de investigaciones IA finalizado', summary);
    return summary;
  }

  private async resolveCredentials(
    assignment: AiResearchAssignment,
  ): Promise<{ apiKey: string | null; model: string | null }> {
    try {
      const creds = await this.credentialRepository.findByOwnerId(assignment.ownerId);
      const gemini = creds
        .filter((c) => c.provider === 'gemini' && c.isActive)
        .sort((a, b) => Number(b.isDefault) - Number(a.isDefault))[0];

      return {
        apiKey: gemini?.apiKey ?? null,
        model: assignment.model ?? gemini?.modelName ?? null,
      };
    } catch (error) {
      Logger.warning('No se pudieron resolver credenciales de IA; se usará entorno', {
        ownerId: assignment.ownerId,
        error: (error as Error).message,
      });
      return { apiKey: null, model: assignment.model ?? null };
    }
  }

  /** Decide si la asignación se reprograma (diaria) o se marca como completada. */
  private async reschedule(
    assignment: AiResearchAssignment,
    usedModel: string,
  ): Promise<void> {
    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const rangeEnded = today >= assignment.endDate;
    const shouldRepeat =
      assignment.recurrence === 'daily' &&
      assignment.continueDelivery &&
      !rangeEnded;

    if (shouldRepeat) {
      const nextRun = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      await this.assignmentRepository.update(assignment.id, {
        status: 'pending',
        nextRunAt: nextRun,
        lastRunAt: now,
        runsCount: assignment.runsCount + 1,
        lastError: null,
        model: usedModel,
      });
    } else {
      await this.assignmentRepository.update(assignment.id, {
        status: 'completed',
        completedAt: now,
        nextRunAt: null,
        lastRunAt: now,
        runsCount: assignment.runsCount + 1,
        lastError: null,
        model: usedModel,
      });
    }
  }
}
