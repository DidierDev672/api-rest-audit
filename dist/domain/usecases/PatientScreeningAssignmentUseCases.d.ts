import { IPatientRepository } from '../repositories';
import { IScreeningRepository } from '../repositories';
import { IPatientScreeningAssignmentRepository } from '../repositories';
import { PatientScreeningAssignment, AssignmentValidationResult } from '../entities';
export interface AssignScreeningsData {
    patientId: string;
    screeningIds: string[];
}
export declare class ValidateAssignmentUseCase {
    private readonly patientRepository;
    private readonly screeningRepository;
    constructor(patientRepository: IPatientRepository, screeningRepository: IScreeningRepository);
    execute(patientId: string, screeningIds: string[]): Promise<AssignmentValidationResult>;
}
export declare class CheckPatientExistsUseCase {
    private readonly repository;
    constructor(repository: IPatientRepository);
    execute(patientId: string): Promise<boolean>;
}
export declare class CheckScreeningExistsUseCase {
    private readonly repository;
    constructor(repository: IScreeningRepository);
    execute(screeningId: string): Promise<boolean>;
}
export declare class CreateAssignmentUseCase {
    private readonly assignmentRepository;
    private readonly patientRepository;
    private readonly screeningRepository;
    constructor(assignmentRepository: IPatientScreeningAssignmentRepository, patientRepository: IPatientRepository, screeningRepository: IScreeningRepository);
    execute(data: AssignScreeningsData): Promise<PatientScreeningAssignment>;
}
export declare class GetAssignmentsByPatientUseCase {
    private readonly repository;
    constructor(repository: IPatientScreeningAssignmentRepository);
    execute(patientId: string): Promise<PatientScreeningAssignment[]>;
}
export declare class GetAssignmentByIdUseCase {
    private readonly repository;
    constructor(repository: IPatientScreeningAssignmentRepository);
    execute(id: string): Promise<PatientScreeningAssignment | null>;
}
export declare class DeleteAssignmentUseCase {
    private readonly repository;
    constructor(repository: IPatientScreeningAssignmentRepository);
    execute(id: string): Promise<void>;
}
export declare class DeletePatientAssignmentsUseCase {
    private readonly repository;
    constructor(repository: IPatientScreeningAssignmentRepository);
    execute(patientId: string): Promise<void>;
}
//# sourceMappingURL=PatientScreeningAssignmentUseCases.d.ts.map