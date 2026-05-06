import { ResearchNote } from '../../domain/entities';
import { ResearchNoteRepository as IResearchNoteRepository } from '../../domain/repositories';
export declare class ResearchNoteRepository implements IResearchNoteRepository {
    private readonly table;
    create(note: {
        id: string;
        research_id: string;
        id_note: string;
        text: string;
        color: string;
        color_name: string;
    }): Promise<void>;
    findAll(): Promise<ResearchNote[]>;
    findByResearchId(researchId: string): Promise<ResearchNote[]>;
    deleteByResearchId(researchId: string): Promise<void>;
    private mapToEntity;
}
//# sourceMappingURL=ResearchNoteRepository.d.ts.map