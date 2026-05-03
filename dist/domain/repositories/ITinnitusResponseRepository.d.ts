import { TinnitusResponse } from '../entities';
export interface ITinnitusResponseRepository {
    create(response: Omit<TinnitusResponse, 'id' | 'createdAt' | 'updatedAt'>): Promise<TinnitusResponse>;
    findAll(): Promise<TinnitusResponse[]>;
    findById(id: string): Promise<TinnitusResponse | null>;
    findByPatientId(patientId: string): Promise<TinnitusResponse[]>;
    findByQuestionnaireId(questionnaireId: string): Promise<TinnitusResponse[]>;
    update(id: string, response: Partial<TinnitusResponse>): Promise<TinnitusResponse>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=ITinnitusResponseRepository.d.ts.map