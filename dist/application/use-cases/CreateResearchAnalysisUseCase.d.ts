import { IResearchAnalysisRepository } from '../../domain/repositories';
import { CreateResearchAnalysisDTO } from '../../presentation/dto';
import { ResearchAnalysis } from '../../domain/entities';
export declare class CreateResearchAnalysisUseCase {
    private readonly repository;
    constructor(repository: IResearchAnalysisRepository);
    execute(data: CreateResearchAnalysisDTO): Promise<ResearchAnalysis>;
}
//# sourceMappingURL=CreateResearchAnalysisUseCase.d.ts.map