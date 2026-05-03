import { DoctorProfessionalData, DoctorCertification, RegistrationStatus } from '../entities';
import { IDoctorRepository, IDoctorProfessionalDataRepository } from '../repositories';
export interface CreateDoctorProfessionalDataInput {
    doctorId: string;
    professionalTitle: string;
    university: string;
    country: string;
    graduationYear: number;
    professionalCardNumber: string;
    rethusRegistration: string;
    registrationStatus: RegistrationStatus;
    medicalSpecialty?: string;
    subspecialty?: string;
    additionalCertifications: DoctorCertification[];
    diplomaUrl?: string;
    degreeCertificateUrl?: string;
    specialtyCertificatesUrl: string[];
}
export declare class CreateDoctorProfessionalDataUseCase {
    private readonly repository;
    private readonly doctorRepository;
    constructor(repository: IDoctorProfessionalDataRepository, doctorRepository: IDoctorRepository);
    execute(data: CreateDoctorProfessionalDataInput): Promise<DoctorProfessionalData>;
}
export declare class GetAllDoctorProfessionalDataUseCase {
    private readonly repository;
    constructor(repository: IDoctorProfessionalDataRepository);
    execute(): Promise<DoctorProfessionalData[]>;
}
export declare class GetDoctorProfessionalDataByIdUseCase {
    private readonly repository;
    constructor(repository: IDoctorProfessionalDataRepository);
    execute(id: string): Promise<DoctorProfessionalData | null>;
}
export declare class GetDoctorProfessionalDataByDoctorIdUseCase {
    private readonly repository;
    constructor(repository: IDoctorProfessionalDataRepository);
    execute(doctorId: string): Promise<DoctorProfessionalData | null>;
}
export declare class UpdateDoctorProfessionalDataUseCase {
    private readonly repository;
    private readonly doctorRepository;
    constructor(repository: IDoctorProfessionalDataRepository, doctorRepository: IDoctorRepository);
    execute(id: string, data: Partial<DoctorProfessionalData>): Promise<DoctorProfessionalData>;
}
export declare class DeleteDoctorProfessionalDataUseCase {
    private readonly repository;
    constructor(repository: IDoctorProfessionalDataRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=DoctorProfessionalDataUseCases.d.ts.map