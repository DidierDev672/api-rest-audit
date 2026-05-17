import { IPatientRepository } from '../repositories';
import { ITinnitusQuestionnaireRepository } from '../repositories';
import { IPatientTinnitusAssignmentRepository } from '../repositories';
import { PatientTinnitusAssignment, TinnitusAssignmentValidationResult } from '../entities';
import { TinnitusAssignmentStatus } from '../enums/TinnitusAssignmentStatus';
export interface AssignTinnitusData {
    idPatient: string;
    idTinnitusQuestionnaires: string;
}
export declare class ValidateTinnitusAssignmentUseCase {
    private readonly patientRepository;
    private readonly tinnitusRepository;
    constructor(patientRepository: IPatientRepository, tinnitusRepository: ITinnitusQuestionnaireRepository);
    execute(idPatient: string, idTinnitusQuestionnaires: string): Promise<TinnitusAssignmentValidationResult>;
}
export declare class CheckPatientTinnitusExistsUseCase {
    private readonly repository;
    constructor(repository: IPatientRepository);
    execute(idPatient: string): Promise<boolean>;
}
export declare class CheckTinnitusExistsUseCase {
    private readonly repository;
    constructor(repository: ITinnitusQuestionnaireRepository);
    execute(idTinnitusQuestionnaires: string): Promise<boolean>;
}
export declare class CreateTinnitusAssignmentUseCase {
    private readonly assignmentRepository;
    private readonly patientRepository;
    private readonly tinnitusRepository;
    constructor(assignmentRepository: IPatientTinnitusAssignmentRepository, patientRepository: IPatientRepository, tinnitusRepository: ITinnitusQuestionnaireRepository);
    execute(data: AssignTinnitusData): Promise<PatientTinnitusAssignment>;
}
export declare class GetTinnitusAssignmentsByPatientUseCase {
    private readonly repository;
    constructor(repository: IPatientTinnitusAssignmentRepository);
    execute(idPatient: string): Promise<PatientTinnitusAssignment[]>;
}
export declare class GetTinnitusAssignmentByIdUseCase {
    private readonly repository;
    constructor(repository: IPatientTinnitusAssignmentRepository);
    execute(id: string): Promise<PatientTinnitusAssignment | null>;
}
export declare class DeleteTinnitusAssignmentUseCase {
    private readonly repository;
    constructor(repository: IPatientTinnitusAssignmentRepository);
    execute(id: string): Promise<void>;
}
export declare class DeletePatientTinnitusAssignmentsUseCase {
    private readonly repository;
    constructor(repository: IPatientTinnitusAssignmentRepository);
    execute(idPatient: string): Promise<void>;
}
export declare class UpdateTinnitusAssignmentUseCase {
    private readonly assignmentRepository;
    private readonly patientRepository;
    private readonly tinnitusRepository;
    constructor(assignmentRepository: IPatientTinnitusAssignmentRepository, patientRepository: IPatientRepository, tinnitusRepository: ITinnitusQuestionnaireRepository);
    execute(id: string, newStatus: TinnitusAssignmentStatus): Promise<PatientTinnitusAssignment>;
}
//# sourceMappingURL=PatientTinnitusAssignmentUseCases.d.ts.map