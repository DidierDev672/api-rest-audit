import { PatientTinnitusAssignment } from '../entities';

export interface IPatientTinnitusAssignmentRepository {
  create(assignment: Omit<PatientTinnitusAssignment, 'id' | 'createdAt' | 'updatedAt'>): Promise<PatientTinnitusAssignment>;
  findByPatientId(idPatient: string): Promise<PatientTinnitusAssignment[]>;
  findByTinnitusId(idTinnitus: string): Promise<PatientTinnitusAssignment[]>;
  findById(id: string): Promise<PatientTinnitusAssignment | null>;
  update(id: string, data: Partial<PatientTinnitusAssignment>): Promise<PatientTinnitusAssignment>;
  delete(id: string): Promise<void>;
  deleteByPatientId(idPatient: string): Promise<void>;
  deleteByTinnitusId(idTinnitus: string): Promise<void>;
}
