import { ResearchNote } from '../entities';
import { IResearchNoteRepository } from '../repositories';
export declare class CreateResearchNotesUseCase {
    private readonly repository;
    constructor(repository: IResearchNoteRepository);
    execute(data: {
        researchId: string;
        notes: {
            id: string;
            text: string;
            color: string;
            colorName: string;
            createdAt: string;
            sourceMessageIndex?: number;
            sourceContent?: string;
        }[];
    }): Promise<ResearchNote[]>;
}
//# sourceMappingURL=ResearchNoteUseCases.d.ts.map