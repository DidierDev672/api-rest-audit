import { ResearchNoteAnalysis } from '../../domain/entities';
import { IResearchNoteAnalysisRepository } from '../../domain/repositories/IResearchNoteAnalysisRepository';
export declare class ResearchNoteAnalysisRepository implements IResearchNoteAnalysisRepository {
    private readonly table;
    create(data: ResearchNoteAnalysis): Promise<void>;
    findById(id: string): Promise<ResearchNoteAnalysis | null>;
    findByResearchId(researchId: string): Promise<ResearchNoteAnalysis[]>;
    private mapToEntity;
}
//# sourceMappingURL=ResearchNoteAnalysisRepository.d.ts.map