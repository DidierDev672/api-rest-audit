import { Patient } from '../entities';

export interface IPatientRepository {
  create(patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>): Promise<Patient>;
  findAll(): Promise<Patient[]>;
  findById(id: string): Promise<Patient | null>;
  findByDocumentNumber(documentNumber: string): Promise<Patient | null>;
  update(id: string, patient: Partial<Patient>): Promise<Patient>;
  delete(id: string): Promise<void>;
}
