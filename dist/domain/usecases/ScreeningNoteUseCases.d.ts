import { ScreeningNote } from '../entities';
import { IScreeningNoteRepository, IPatientRepository, IScreeningRepository } from '../repositories';
export interface CreateScreeningNoteData {
    idPatient: string;
    idScreening: string;
    idDoctor: string;
    titleNote: string;
    descriptionNote: string;
}
export declare class CreateScreeningNoteUseCase {
    private readonly repository;
    private readonly patientRepository;
    private readonly screeningRepository;
    constructor(repository: IScreeningNoteRepository, patientRepository: IPatientRepository, screeningRepository: IScreeningRepository);
    execute(data: CreateScreeningNoteData): Promise<ScreeningNote>;
}
export declare class GetAllScreeningNotesUseCase {
    private readonly repository;
    constructor(repository: IScreeningNoteRepository);
    execute(): Promise<ScreeningNote[]>;
}
export declare class GetScreeningNoteByIdUseCase {
    private readonly repository;
    constructor(repository: IScreeningNoteRepository);
    execute(id: string): Promise<ScreeningNote | null>;
}
export declare class GetScreeningNotesByPatientUseCase {
    private readonly repository;
    constructor(repository: IScreeningNoteRepository);
    execute(patientId: string): Promise<ScreeningNote[]>;
}
export declare class GetScreeningNotesByScreeningUseCase {
    private readonly repository;
    constructor(repository: IScreeningNoteRepository);
    execute(screeningId: string): Promise<ScreeningNote[]>;
}
export declare class UpdateScreeningNoteUseCase {
    private readonly repository;
    private readonly patientRepository;
    private readonly screeningRepository;
    constructor(repository: IScreeningNoteRepository, patientRepository: IPatientRepository, screeningRepository: IScreeningRepository);
    execute(id: string, data: Partial<ScreeningNote>): Promise<ScreeningNote>;
}
export declare class DeleteScreeningNoteUseCase {
    private readonly repository;
    constructor(repository: IScreeningNoteRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=ScreeningNoteUseCases.d.ts.map