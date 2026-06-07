import { AiResearchResult } from '../entities/AiResearchAssignmentEntity';

export interface IAiResearchResultRepository {
  create(data: AiResearchResult): Promise<void>;
  findById(id: string): Promise<AiResearchResult | null>;
  findByOwnerId(ownerId: string, onlyUnseen?: boolean): Promise<AiResearchResult[]>;
  findByAssignmentId(assignmentId: string): Promise<AiResearchResult[]>;
  markSeen(id: string): Promise<void>;
  delete(id: string): Promise<void>;
}
