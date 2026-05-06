import { TinnitusAnalysis } from '../../domain/entities';
import { ITinnitusAnalysisRepository } from '../../domain/repositories';
export declare class TinnitusAnalysisRepository implements ITinnitusAnalysisRepository {
    private readonly table;
    create(data: Omit<TinnitusAnalysis, 'id' | 'createdAt' | 'updatedAt'>): Promise<TinnitusAnalysis>;
    findAll(): Promise<TinnitusAnalysis[]>;
    findById(id: string): Promise<TinnitusAnalysis | null>;
    findByPatientId(patientId: string): Promise<TinnitusAnalysis[]>;
    findByTinnitusQuestionnaireId(questionnaireId: string): Promise<TinnitusAnalysis[]>;
    findByTinnitusResponseId(responseId: string): Promise<TinnitusAnalysis[]>;
    update(id: string, data: Partial<TinnitusAnalysis>): Promise<TinnitusAnalysis>;
    delete(id: string): Promise<void>;
    private mapToEntity;
}
//# sourceMappingURL=TinnitusAnalysisRepository.d.ts.map