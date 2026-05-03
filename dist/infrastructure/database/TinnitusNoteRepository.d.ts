import { TinnitusNote } from '../../domain/entities';
import { ITinnitusNoteRepository } from '../../domain/repositories';
export declare class TinnitusNoteRepository implements ITinnitusNoteRepository {
    private readonly table;
    create(data: Omit<TinnitusNote, 'id' | 'createdAt' | 'updatedAt'>): Promise<TinnitusNote>;
    findAll(): Promise<TinnitusNote[]>;
    findById(id: string): Promise<TinnitusNote | null>;
    findByPatientId(patientId: string): Promise<TinnitusNote[]>;
    findByTinnitusQuestionnaireId(questionnaireId: string): Promise<TinnitusNote[]>;
    findByTinnitusResponseId(responseId: string): Promise<TinnitusNote[]>;
    update(id: string, data: Partial<TinnitusNote>): Promise<TinnitusNote>;
    delete(id: string): Promise<void>;
    private mapToEntity;
}
//# sourceMappingURL=TinnitusNoteRepository.d.ts.map