import { IPatientRepository } from '../../domain/repositories/IPatientRepository';
export declare class SearchPatientsByNameUseCase {
    private readonly patientRepository;
    constructor(patientRepository: IPatientRepository);
    execute(name: string): Promise<{
        id: string;
        fullName: string;
        documentType: import("../../domain/entities").DocumentType;
        documentNumber: string;
        birthDate: string;
    }[]>;
}
//# sourceMappingURL=SearchPatientsByNameUseCase.d.ts.map