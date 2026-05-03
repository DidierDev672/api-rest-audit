import { ResearchNote } from '../entities';
export interface IResearchNoteRepository {
    createMany(notes: Omit<ResearchNote, 'createdAt' | 'updatedAt'>[]): Promise<ResearchNote[]>;
    findByResearchId(researchId: string): Promise<ResearchNote[]>;
    deleteByResearchId(researchId: string): Promise<void>;
}
//# sourceMappingURL=IResearchNoteRepository.d.ts.map