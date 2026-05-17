import { ResearchAnalysis } from '../../domain/entities';
import { ResearchAnalysisRepository as IResearchAnalysisRepository } from '../../domain/repositories';
export declare class ResearchAnalysisRepository implements IResearchAnalysisRepository {
    private readonly table;
    create(data: Omit<ResearchAnalysis, 'id' | 'createdAt' | 'updatedAt'>): Promise<ResearchAnalysis>;
    findAll(): Promise<ResearchAnalysis[]>;
    findById(id: string): Promise<ResearchAnalysis | null>;
    findByResearchId(researchId: string): Promise<ResearchAnalysis[]>;
    update(id: string, data: Partial<ResearchAnalysis>): Promise<ResearchAnalysis>;
    delete(id: string): Promise<void>;
    deleteByResearchId(researchId: string): Promise<void>;
    private mapToEntity;
}
//# sourceMappingURL=ResearchAnalysisRepository.d.ts.map