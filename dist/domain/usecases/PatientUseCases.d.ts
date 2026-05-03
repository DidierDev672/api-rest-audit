import { Patient, PatientFamilyData } from '../entities';
import { IPatientRepository } from '../repositories';
export interface CreatePatientData {
    fullName: string;
    documentType: Patient['documentType'];
    documentNumber: string;
    birthDate: Date;
    height: number;
    weight: number;
    isAllergic: boolean;
    familyData: PatientFamilyData;
    hasConsent: boolean;
}
export declare class CreatePatientUseCase {
    private readonly repository;
    constructor(repository: IPatientRepository);
    execute(data: CreatePatientData): Promise<Patient>;
}
export declare class GetAllPatientsUseCase {
    private readonly repository;
    constructor(repository: IPatientRepository);
    execute(): Promise<Patient[]>;
}
export declare class GetPatientByIdUseCase {
    private readonly repository;
    constructor(repository: IPatientRepository);
    execute(id: string): Promise<Patient | null>;
}
export declare class UpdatePatientUseCase {
    private readonly repository;
    constructor(repository: IPatientRepository);
    execute(id: string, data: Partial<Patient>): Promise<Patient>;
}
export declare class DeletePatientUseCase {
    private readonly repository;
    constructor(repository: IPatientRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=PatientUseCases.d.ts.map