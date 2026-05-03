import { Doctor, DoctorDocumentType, Gender } from '../entities';
import { IDoctorRepository } from '../repositories';
export interface CreateDoctorData {
    documentType: DoctorDocumentType;
    documentNumber: string;
    fullName: string;
    birthDate: Date;
    gender: Gender;
    email: string;
    phone?: string;
    address?: string;
}
export declare class CreateDoctorUseCase {
    private readonly repository;
    constructor(repository: IDoctorRepository);
    execute(data: CreateDoctorData): Promise<Doctor>;
}
export declare class GetAllDoctorsUseCase {
    private readonly repository;
    constructor(repository: IDoctorRepository);
    execute(): Promise<Doctor[]>;
}
export declare class GetDoctorByIdUseCase {
    private readonly repository;
    constructor(repository: IDoctorRepository);
    execute(id: string): Promise<Doctor | null>;
}
export declare class UpdateDoctorUseCase {
    private readonly repository;
    constructor(repository: IDoctorRepository);
    execute(id: string, data: Partial<Doctor>): Promise<Doctor>;
}
export declare class DeleteDoctorUseCase {
    private readonly repository;
    constructor(repository: IDoctorRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=DoctorUseCases.d.ts.map