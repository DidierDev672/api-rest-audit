import { PatientScreeningAssignment } from '../../domain/entities';
import { IPatientScreeningAssignmentRepository } from '../../domain/repositories';
export declare class PatientScreeningAssignmentRepository implements IPatientScreeningAssignmentRepository {
    private readonly table;
    create(data: Omit<PatientScreeningAssignment, 'id' | 'createdAt' | 'updatedAt'>): Promise<PatientScreeningAssignment>;
    findByPatientId(patientId: string): Promise<PatientScreeningAssignment[]>;
    findById(id: string): Promise<PatientScreeningAssignment | null>;
    update(id: string, data: Partial<PatientScreeningAssignment>): Promise<PatientScreeningAssignment>;
    delete(id: string): Promise<void>;
    deleteByPatientId(patientId: string): Promise<void>;
    private mapToEntity;
}
//# sourceMappingURL=PatientScreeningAssignmentRepository.d.ts.map