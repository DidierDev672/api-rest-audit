import { TinnitusAnalysis } from '../entities';
import { ITinnitusAnalysisRepository, IPatientRepository, ITinnitusQuestionnaireRepository, ITinnitusResponseRepository } from '../repositories';
export interface CreateTinnitusAnalysisData {
    idPatient: string;
    idTinnitusQuestionnaires: string;
    idTinnitusResponse: string;
    analysis: string;
    model: string;
}
export declare class CreateTinnitusAnalysisUseCase {
    private readonly repository;
    private readonly patientRepository;
    private readonly questionnaireRepository;
    private readonly responseRepository;
    constructor(repository: ITinnitusAnalysisRepository, patientRepository: IPatientRepository, questionnaireRepository: ITinnitusQuestionnaireRepository, responseRepository: ITinnitusResponseRepository);
    execute(data: CreateTinnitusAnalysisData): Promise<TinnitusAnalysis>;
    private validateReferences;
}
export declare class GetAllTinnitusAnalysisUseCase {
    private readonly repository;
    constructor(repository: ITinnitusAnalysisRepository);
    execute(): Promise<TinnitusAnalysis[]>;
}
export declare class GetTinnitusAnalysisByIdUseCase {
    private readonly repository;
    constructor(repository: ITinnitusAnalysisRepository);
    execute(id: string): Promise<TinnitusAnalysis | null>;
}
export declare class GetTinnitusAnalysisByPatientUseCase {
    private readonly repository;
    constructor(repository: ITinnitusAnalysisRepository);
    execute(patientId: string): Promise<TinnitusAnalysis[]>;
}
export declare class GetTinnitusAnalysisByQuestionnaireUseCase {
    private readonly repository;
    constructor(repository: ITinnitusAnalysisRepository);
    execute(questionnaireId: string): Promise<TinnitusAnalysis[]>;
}
export declare class GetTinnitusAnalysisByResponseUseCase {
    private readonly repository;
    constructor(repository: ITinnitusAnalysisRepository);
    execute(responseId: string): Promise<TinnitusAnalysis[]>;
}
export declare class UpdateTinnitusAnalysisUseCase {
    private readonly repository;
    private readonly patientRepository;
    private readonly questionnaireRepository;
    private readonly responseRepository;
    constructor(repository: ITinnitusAnalysisRepository, patientRepository: IPatientRepository, questionnaireRepository: ITinnitusQuestionnaireRepository, responseRepository: ITinnitusResponseRepository);
    execute(id: string, data: Partial<TinnitusAnalysis>): Promise<TinnitusAnalysis>;
    private validateReferences;
}
export declare class DeleteTinnitusAnalysisUseCase {
    private readonly repository;
    constructor(repository: ITinnitusAnalysisRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=TinnitusAnalysisUseCases.d.ts.map