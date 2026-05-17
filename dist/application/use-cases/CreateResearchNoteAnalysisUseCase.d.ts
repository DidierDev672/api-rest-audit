import { IResearchNoteAnalysisRepository } from '../../domain/repositories/IResearchNoteAnalysisRepository';
import { IAuditoryResearchRepository } from '../../domain/repositories';
import { CreateResearchNoteAnalysisDTO } from '../../presentation/dto';
export declare class CreateResearchNoteAnalysisUseCase {
    private readonly repository;
    private readonly researchRepository;
    constructor(repository: IResearchNoteAnalysisRepository, researchRepository: IAuditoryResearchRepository);
    execute(data: CreateResearchNoteAnalysisDTO, userId: string): Promise<{
        id: string;
        research_id: string;
        created_by_user_id: string;
        created_at: string;
    }>;
}
//# sourceMappingURL=CreateResearchNoteAnalysisUseCase.d.ts.map