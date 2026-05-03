import { ScreeningNote } from '../entities';

export interface IScreeningNoteRepository {
  create(note: Omit<ScreeningNote, 'id' | 'createdAt' | 'updatedAt'>): Promise<ScreeningNote>;
  findAll(): Promise<ScreeningNote[]>;
  findById(id: string): Promise<ScreeningNote | null>;
  findByPatientId(patientId: string): Promise<ScreeningNote[]>;
  findByScreeningId(screeningId: string): Promise<ScreeningNote[]>;
  update(id: string, note: Partial<ScreeningNote>): Promise<ScreeningNote>;
  delete(id: string): Promise<void>;
}
