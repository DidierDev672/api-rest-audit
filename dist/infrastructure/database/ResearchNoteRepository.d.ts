import { ResearchNote } from '../../domain/entities';
import { IResearchNoteRepository } from '../../domain/repositories';
export declare class ResearchNoteRepository implements IResearchNoteRepository {
    private readonly table;
    createMany(notes: Omit<ResearchNote, 'createdAt' | 'updatedAt'>[]): Promise<ResearchNote[]>;
    findByResearchId(researchId: string): Promise<ResearchNote[]>;
    deleteByResearchId(researchId: string): Promise<void>;
    private mapToEntity;
}
//# sourceMappingURL=ResearchNoteRepository.d.ts.map