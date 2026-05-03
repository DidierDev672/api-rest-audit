import { TinnitusNote } from '../entities';

export interface ITinnitusNoteRepository {
  create(note: Omit<TinnitusNote, 'id' | 'createdAt' | 'updatedAt'>): Promise<TinnitusNote>;
  findAll(): Promise<TinnitusNote[]>;
  findById(id: string): Promise<TinnitusNote | null>;
  findByPatientId(patientId: string): Promise<TinnitusNote[]>;
  findByTinnitusQuestionnaireId(questionnaireId: string): Promise<TinnitusNote[]>;
  findByTinnitusResponseId(responseId: string): Promise<TinnitusNote[]>;
  update(id: string, note: Partial<TinnitusNote>): Promise<TinnitusNote>;
  delete(id: string): Promise<void>;
}