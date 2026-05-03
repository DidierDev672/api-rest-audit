import { DoctorProfessionalData } from '../entities';
export interface IDoctorProfessionalDataRepository {
    create(data: Omit<DoctorProfessionalData, 'id' | 'createdAt' | 'updatedAt'>): Promise<DoctorProfessionalData>;
    findAll(): Promise<DoctorProfessionalData[]>;
    findById(id: string): Promise<DoctorProfessionalData | null>;
    findByDoctorId(doctorId: string): Promise<DoctorProfessionalData | null>;
    findByRethusRegistration(rethusRegistration: string): Promise<DoctorProfessionalData | null>;
    findByProfessionalCard(professionalCardNumber: string): Promise<DoctorProfessionalData | null>;
    update(id: string, data: Partial<DoctorProfessionalData>): Promise<DoctorProfessionalData>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=IDoctorProfessionalDataRepository.d.ts.map