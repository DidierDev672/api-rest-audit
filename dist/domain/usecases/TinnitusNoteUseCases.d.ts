import { TinnitusNote } from '../entities';
import { ITinnitusNoteRepository, IPatientRepository, ITinnitusQuestionnaireRepository, ITinnitusResponseRepository } from '../repositories';
export interface CreateTinnitusNoteData {
    idPatient: string;
    idTinnitusQuestionnaires: string;
    idTinnitusResponse: string;
    description: string;
}
export declare class CreateTinnitusNoteUseCase {
    private readonly repository;
    private readonly patientRepository;
    private readonly questionnaireRepository;
    private readonly responseRepository;
    constructor(repository: ITinnitusNoteRepository, patientRepository: IPatientRepository, questionnaireRepository: ITinnitusQuestionnaireRepository, responseRepository: ITinnitusResponseRepository);
    execute(data: CreateTinnitusNoteData): Promise<TinnitusNote>;
    private validateReferences;
}
export declare class GetAllTinnitusNotesUseCase {
    private readonly repository;
    constructor(repository: ITinnitusNoteRepository);
    execute(): Promise<TinnitusNote[]>;
}
export declare class GetTinnitusNoteByIdUseCase {
    private readonly repository;
    constructor(repository: ITinnitusNoteRepository);
    execute(id: string): Promise<TinnitusNote | null>;
}
export declare class GetTinnitusNotesByPatientUseCase {
    private readonly repository;
    constructor(repository: ITinnitusNoteRepository);
    execute(patientId: string): Promise<TinnitusNote[]>;
}
export declare class GetTinnitusNotesByQuestionnaireUseCase {
    private readonly repository;
    constructor(repository: ITinnitusNoteRepository);
    execute(questionnaireId: string): Promise<TinnitusNote[]>;
}
export declare class GetTinnitusNotesByResponseUseCase {
    private readonly repository;
    constructor(repository: ITinnitusNoteRepository);
    execute(responseId: string): Promise<TinnitusNote[]>;
}
export declare class UpdateTinnitusNoteUseCase {
    private readonly repository;
    private readonly patientRepository;
    private readonly questionnaireRepository;
    private readonly responseRepository;
    constructor(repository: ITinnitusNoteRepository, patientRepository: IPatientRepository, questionnaireRepository: ITinnitusQuestionnaireRepository, responseRepository: ITinnitusResponseRepository);
    execute(id: string, data: Partial<TinnitusNote>): Promise<TinnitusNote>;
    private validateReferences;
}
export declare class DeleteTinnitusNoteUseCase {
    private readonly repository;
    constructor(repository: ITinnitusNoteRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=TinnitusNoteUseCases.d.ts.map