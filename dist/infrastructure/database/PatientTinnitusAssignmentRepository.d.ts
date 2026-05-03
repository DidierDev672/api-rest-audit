import { PatientTinnitusAssignment } from '../../domain/entities';
import { IPatientTinnitusAssignmentRepository } from '../../domain/repositories';
export declare class PatientTinnitusAssignmentRepository implements IPatientTinnitusAssignmentRepository {
    private readonly table;
    create(data: Omit<PatientTinnitusAssignment, 'id' | 'createdAt' | 'updatedAt'>): Promise<PatientTinnitusAssignment>;
    findByPatientId(idPatient: string): Promise<PatientTinnitusAssignment[]>;
    findByTinnitusId(idTinnitus: string): Promise<PatientTinnitusAssignment[]>;
    findById(id: string): Promise<PatientTinnitusAssignment | null>;
    delete(id: string): Promise<void>;
    deleteByPatientId(idPatient: string): Promise<void>;
    deleteByTinnitusId(idTinnitus: string): Promise<void>;
    private mapToEntity;
}
//# sourceMappingURL=PatientTinnitusAssignmentRepository.d.ts.map