import { PatientScreeningAssignment } from '../entities';

export interface IPatientScreeningAssignmentRepository {
  create(assignment: Omit<PatientScreeningAssignment, 'id' | 'createdAt' | 'updatedAt'>): Promise<PatientScreeningAssignment>;
  findByPatientId(patientId: string): Promise<PatientScreeningAssignment[]>;
  findById(id: string): Promise<PatientScreeningAssignment | null>;
  update(id: string, assignment: Partial<PatientScreeningAssignment>): Promise<PatientScreeningAssignment>;
  delete(id: string): Promise<void>;
  deleteByPatientId(patientId: string): Promise<void>;
}
