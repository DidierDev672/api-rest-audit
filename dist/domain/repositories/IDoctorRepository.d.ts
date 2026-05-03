import { Doctor } from '../entities';
export interface IDoctorRepository {
    create(doctor: Omit<Doctor, 'id' | 'createdAt' | 'updatedAt'>): Promise<Doctor>;
    findAll(): Promise<Doctor[]>;
    findById(id: string): Promise<Doctor | null>;
    findByDocumentNumber(documentNumber: string): Promise<Doctor | null>;
    findByEmail(email: string): Promise<Doctor | null>;
    update(id: string, doctor: Partial<Doctor>): Promise<Doctor>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=IDoctorRepository.d.ts.map