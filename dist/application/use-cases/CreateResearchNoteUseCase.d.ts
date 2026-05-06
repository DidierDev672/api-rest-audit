import { ResearchNoteRepository } from '../../domain/repositories/ResearchNoteRepository';
import { CreateResearchNoteDTO } from '../../presentation/dto';
export declare class CreateResearchNoteUseCase {
    private readonly repository;
    constructor(repository: ResearchNoteRepository);
    execute(data: CreateResearchNoteDTO): Promise<void>;
}
//# sourceMappingURL=CreateResearchNoteUseCase.d.ts.map