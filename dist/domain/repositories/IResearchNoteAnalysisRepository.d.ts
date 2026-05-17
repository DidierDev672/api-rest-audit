import { ResearchNoteAnalysis } from '../entities';
export interface IResearchNoteAnalysisRepository {
    create(data: ResearchNoteAnalysis): Promise<void>;
    findById(id: string): Promise<ResearchNoteAnalysis | null>;
    findByResearchId(researchId: string): Promise<ResearchNoteAnalysis[]>;
}
//# sourceMappingURL=IResearchNoteAnalysisRepository.d.ts.map