import { ScreeningNote } from '../../domain/entities';
import { IScreeningNoteRepository } from '../../domain/repositories';
export declare class ScreeningNoteRepository implements IScreeningNoteRepository {
    private readonly table;
    create(data: Omit<ScreeningNote, 'id' | 'createdAt' | 'updatedAt'>): Promise<ScreeningNote>;
    findAll(): Promise<ScreeningNote[]>;
    findById(id: string): Promise<ScreeningNote | null>;
    findByPatientId(patientId: string): Promise<ScreeningNote[]>;
    findByScreeningId(screeningId: string): Promise<ScreeningNote[]>;
    update(id: string, data: Partial<ScreeningNote>): Promise<ScreeningNote>;
    delete(id: string): Promise<void>;
    private mapToEntity;
}
//# sourceMappingURL=ScreeningNoteRepository.d.ts.map