import { Patient } from '../../domain/entities';
import { IPatientRepository } from '../../domain/repositories';
export declare class PatientRepository implements IPatientRepository {
    private readonly table;
    create(data: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>): Promise<Patient>;
    findAll(): Promise<Patient[]>;
    findById(id: string): Promise<Patient | null>;
    findByDocumentNumber(documentNumber: string): Promise<Patient | null>;
    searchByName(name: string): Promise<Patient[]>;
    update(id: string, data: Partial<Patient>): Promise<Patient>;
    delete(id: string): Promise<void>;
    private mapToEntity;
}
//# sourceMappingURL=PatientRepository.d.ts.map