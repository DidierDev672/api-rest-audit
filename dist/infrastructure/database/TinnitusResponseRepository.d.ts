import { TinnitusResponse } from '../../domain/entities';
import { ITinnitusResponseRepository } from '../../domain/repositories';
export declare class TinnitusResponseRepository implements ITinnitusResponseRepository {
    private readonly table;
    create(data: Omit<TinnitusResponse, 'id' | 'createdAt' | 'updatedAt'>): Promise<TinnitusResponse>;
    findAll(): Promise<TinnitusResponse[]>;
    findById(id: string): Promise<TinnitusResponse | null>;
    findByPatientId(patientId: string): Promise<TinnitusResponse[]>;
    findByQuestionnaireId(questionnaireId: string): Promise<TinnitusResponse[]>;
    update(id: string, data: Partial<TinnitusResponse>): Promise<TinnitusResponse>;
    delete(id: string): Promise<void>;
    private mapToEntity;
}
//# sourceMappingURL=TinnitusResponseRepository.d.ts.map