import { IAiResearchAssignmentRepository } from '../../domain/repositories/IAiResearchAssignmentRepository';
import { IAiResearchResultRepository } from '../../domain/repositories/IAiResearchResultRepository';
import {
  AiResearchAssignmentResponse,
  AiResearchResultResponse,
  toAiResearchAssignmentResponse,
  toAiResearchResultResponse,
} from '../../domain/entities/AiResearchAssignmentEntity';
import { ValidationError } from '../../domain/errors/ValidationError';
import { Logger } from '../../infrastructure/logger/Logger';

export class GetAiResearchUseCase {
  constructor(
    private readonly assignmentRepository: IAiResearchAssignmentRepository,
    private readonly resultRepository: IAiResearchResultRepository,
  ) {}

  async getAssignmentsByOwner(ownerId: string): Promise<AiResearchAssignmentResponse[]> {
    Logger.info('Obteniendo asignaciones de investigación IA por owner', { ownerId });
    const items = await this.assignmentRepository.findByOwnerId(ownerId);
    return items.map(toAiResearchAssignmentResponse);
  }

  async getAssignmentById(id: string): Promise<AiResearchAssignmentResponse> {
    const assignment = await this.assignmentRepository.findById(id);
    if (!assignment) {
      throw new ValidationError(`Asignación con ID ${id} no encontrada`);
    }
    return toAiResearchAssignmentResponse(assignment);
  }

  async getResultsByOwner(
    ownerId: string,
    onlyUnseen = false,
  ): Promise<AiResearchResultResponse[]> {
    Logger.info('Obteniendo resultados de investigación IA por owner', { ownerId, onlyUnseen });
    const items = await this.resultRepository.findByOwnerId(ownerId, onlyUnseen);
    return items.map(toAiResearchResultResponse);
  }

  async getResultsByAssignment(assignmentId: string): Promise<AiResearchResultResponse[]> {
    const items = await this.resultRepository.findByAssignmentId(assignmentId);
    return items.map(toAiResearchResultResponse);
  }

  async markResultSeen(id: string): Promise<void> {
    const result = await this.resultRepository.findById(id);
    if (!result) {
      throw new ValidationError(`Resultado con ID ${id} no encontrado`);
    }
    await this.resultRepository.markSeen(id);
    Logger.success('Resultado de investigación IA marcado como visto', { id });
  }
}
