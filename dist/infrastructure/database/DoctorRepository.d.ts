import { Doctor } from '../../domain/entities';
import { IDoctorRepository } from '../../domain/repositories';
export declare class DoctorRepository implements IDoctorRepository {
    private readonly table;
    create(data: Omit<Doctor, 'id' | 'createdAt' | 'updatedAt'>): Promise<Doctor>;
    findAll(): Promise<Doctor[]>;
    findById(id: string): Promise<Doctor | null>;
    findByDocumentNumber(documentNumber: string): Promise<Doctor | null>;
    findByEmail(email: string): Promise<Doctor | null>;
    update(id: string, data: Partial<Doctor>): Promise<Doctor>;
    delete(id: string): Promise<void>;
    private mapToEntity;
}
//# sourceMappingURL=DoctorRepository.d.ts.map