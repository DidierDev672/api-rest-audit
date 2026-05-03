import { TinnitusResponse } from '../entities';
import { ITinnitusResponseRepository } from '../repositories';
export declare class CreateTinnitusResponseUseCase {
    private readonly repository;
    constructor(repository: ITinnitusResponseRepository);
    execute(data: Omit<TinnitusResponse, 'id' | 'createdAt' | 'updatedAt'>): Promise<TinnitusResponse>;
}
export declare class GetAllTinnitusResponsesUseCase {
    private readonly repository;
    constructor(repository: ITinnitusResponseRepository);
    execute(): Promise<TinnitusResponse[]>;
}
export declare class GetTinnitusResponseByIdUseCase {
    private readonly repository;
    constructor(repository: ITinnitusResponseRepository);
    execute(id: string): Promise<TinnitusResponse | null>;
}
export declare class GetTinnitusResponsesByPatientIdUseCase {
    private readonly repository;
    constructor(repository: ITinnitusResponseRepository);
    execute(patientId: string): Promise<TinnitusResponse[]>;
}
export declare class GetTinnitusResponsesByQuestionnaireIdUseCase {
    private readonly repository;
    constructor(repository: ITinnitusResponseRepository);
    execute(questionnaireId: string): Promise<TinnitusResponse[]>;
}
export declare class UpdateTinnitusResponseUseCase {
    private readonly repository;
    constructor(repository: ITinnitusResponseRepository);
    execute(id: string, data: Partial<TinnitusResponse>): Promise<TinnitusResponse>;
}
export declare class DeleteTinnitusResponseUseCase {
    private readonly repository;
    constructor(repository: ITinnitusResponseRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=TinnitusResponseUseCases.d.ts.map