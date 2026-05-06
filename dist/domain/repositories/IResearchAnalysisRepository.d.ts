import { ResearchAnalysis } from '../entities';
export interface IResearchAnalysisRepository {
    create(analysis: Omit<ResearchAnalysis, 'id' | 'createdAt' | 'updatedAt'>): Promise<ResearchAnalysis>;
    findById(id: string): Promise<ResearchAnalysis | null>;
    findByResearchId(researchId: string): Promise<ResearchAnalysis[]>;
    update(id: string, data: Partial<ResearchAnalysis>): Promise<ResearchAnalysis>;
    delete(id: string): Promise<void>;
    deleteByResearchId(researchId: string): Promise<void>;
}
//# sourceMappingURL=IResearchAnalysisRepository.d.ts.map