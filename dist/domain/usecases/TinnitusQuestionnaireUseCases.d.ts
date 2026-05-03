import { TinnitusQuestionnaire, Question } from '../entities';
import { ITinnitusQuestionnaireRepository } from '../repositories';
export declare class CreateTinnitusQuestionnaireUseCase {
    private readonly repository;
    constructor(repository: ITinnitusQuestionnaireRepository);
    execute(data: {
        title: string;
        description: string;
        questions: Question[];
    }): Promise<TinnitusQuestionnaire>;
}
export declare class GetAllTinnitusQuestionnairesUseCase {
    private readonly repository;
    constructor(repository: ITinnitusQuestionnaireRepository);
    execute(): Promise<TinnitusQuestionnaire[]>;
}
export declare class GetTinnitusQuestionnaireByIdUseCase {
    private readonly repository;
    constructor(repository: ITinnitusQuestionnaireRepository);
    execute(id: string): Promise<TinnitusQuestionnaire | null>;
}
export declare class UpdateTinnitusQuestionnaireUseCase {
    private readonly repository;
    constructor(repository: ITinnitusQuestionnaireRepository);
    execute(id: string, data: Partial<TinnitusQuestionnaire>): Promise<TinnitusQuestionnaire>;
}
export declare class DeleteTinnitusQuestionnaireUseCase {
    private readonly repository;
    constructor(repository: ITinnitusQuestionnaireRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=TinnitusQuestionnaireUseCases.d.ts.map