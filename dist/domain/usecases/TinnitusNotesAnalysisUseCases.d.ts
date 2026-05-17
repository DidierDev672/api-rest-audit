import { TinnitusNotesAnalysis } from '../entities';
import { ITinnitusNotesAnalysisRepository, IPatientRepository, ITinnitusQuestionnaireRepository, ITinnitusResponseRepository } from '../repositories';
export interface CreateTinnitusNotesAnalysisData {
    idPatient: string;
    idTinnitusQuestionnaires?: string;
    idTinnitusResponse?: string;
    analysis: string;
    noteCount?: number;
    analyzedAt?: Date;
    createdBy?: string;
}
export declare class CreateTinnitusNotesAnalysisUseCase {
    private readonly repository;
    private readonly patientRepository;
    private readonly questionnaireRepository?;
    private readonly responseRepository?;
    constructor(repository: ITinnitusNotesAnalysisRepository, patientRepository: IPatientRepository, questionnaireRepository?: ITinnitusQuestionnaireRepository | undefined, responseRepository?: ITinnitusResponseRepository | undefined);
    execute(data: CreateTinnitusNotesAnalysisData): Promise<TinnitusNotesAnalysis>;
    private validateReferences;
}
export declare class GetAllTinnitusNotesAnalysisUseCase {
    private readonly repository;
    constructor(repository: ITinnitusNotesAnalysisRepository);
    execute(): Promise<TinnitusNotesAnalysis[]>;
}
export declare class GetTinnitusNotesAnalysisByIdUseCase {
    private readonly repository;
    constructor(repository: ITinnitusNotesAnalysisRepository);
    execute(id: string): Promise<TinnitusNotesAnalysis | null>;
}
export declare class GetTinnitusNotesAnalysisByPatientUseCase {
    private readonly repository;
    constructor(repository: ITinnitusNotesAnalysisRepository);
    execute(patientId: string): Promise<TinnitusNotesAnalysis[]>;
}
export declare class GetTinnitusNotesAnalysisByQuestionnaireUseCase {
    private readonly repository;
    constructor(repository: ITinnitusNotesAnalysisRepository);
    execute(questionnaireId: string): Promise<TinnitusNotesAnalysis[]>;
}
export declare class GetTinnitusNotesAnalysisByResponseUseCase {
    private readonly repository;
    constructor(repository: ITinnitusNotesAnalysisRepository);
    execute(responseId: string): Promise<TinnitusNotesAnalysis[]>;
}
export declare class UpdateTinnitusNotesAnalysisUseCase {
    private readonly repository;
    private readonly patientRepository;
    private readonly questionnaireRepository?;
    private readonly responseRepository?;
    constructor(repository: ITinnitusNotesAnalysisRepository, patientRepository: IPatientRepository, questionnaireRepository?: ITinnitusQuestionnaireRepository | undefined, responseRepository?: ITinnitusResponseRepository | undefined);
    execute(id: string, data: Partial<TinnitusNotesAnalysis>): Promise<TinnitusNotesAnalysis>;
    private validateReferences;
}
export declare class DeleteTinnitusNotesAnalysisUseCase {
    private readonly repository;
    constructor(repository: ITinnitusNotesAnalysisRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=TinnitusNotesAnalysisUseCases.d.ts.map