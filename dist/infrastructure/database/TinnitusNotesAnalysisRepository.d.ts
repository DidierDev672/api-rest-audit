import { TinnitusNotesAnalysis } from '../../domain/entities';
import { ITinnitusNotesAnalysisRepository } from '../../domain/repositories';
export declare class TinnitusNotesAnalysisRepository implements ITinnitusNotesAnalysisRepository {
    private readonly table;
    create(data: Omit<TinnitusNotesAnalysis, 'id' | 'createdAt' | 'updatedAt'>): Promise<TinnitusNotesAnalysis>;
    findAll(): Promise<TinnitusNotesAnalysis[]>;
    findById(id: string): Promise<TinnitusNotesAnalysis | null>;
    findByPatientId(patientId: string): Promise<TinnitusNotesAnalysis[]>;
    findByTinnitusQuestionnaireId(questionnaireId: string): Promise<TinnitusNotesAnalysis[]>;
    findByTinnitusResponseId(responseId: string): Promise<TinnitusNotesAnalysis[]>;
    update(id: string, data: Partial<TinnitusNotesAnalysis>): Promise<TinnitusNotesAnalysis>;
    delete(id: string): Promise<void>;
    private mapToEntity;
}
//# sourceMappingURL=TinnitusNotesAnalysisRepository.d.ts.map