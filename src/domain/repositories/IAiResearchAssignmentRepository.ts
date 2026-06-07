import { AiResearchAssignment } from '../entities/AiResearchAssignmentEntity';

export interface IAiResearchAssignmentRepository {
  create(data: AiResearchAssignment): Promise<void>;
  findById(id: string): Promise<AiResearchAssignment | null>;
  findByOwnerId(ownerId: string): Promise<AiResearchAssignment[]>;
  /** Asignaciones listas para ejecutar (status `pending` y next_run_at <= ahora). */
  findDuePending(limit: number): Promise<AiResearchAssignment[]>;
  update(
    id: string,
    data: Partial<AiResearchAssignment>,
  ): Promise<AiResearchAssignment>;
  delete(id: string): Promise<void>;
}
