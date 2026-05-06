import { Investigacion } from '../entities';
import { IInvestigacionRepository } from '../repositories';
export declare class CreateInvestigacionUseCase {
    private readonly repository;
    constructor(repository: IInvestigacionRepository);
    execute(data: {
        id_resource: string;
        content_resource: string;
    }): Promise<Investigacion>;
}
export declare class GetAllInvestigacionesUseCase {
    private readonly repository;
    constructor(repository: IInvestigacionRepository);
    execute(): Promise<Investigacion[]>;
}
export declare class GetInvestigacionByIdUseCase {
    private readonly repository;
    constructor(repository: IInvestigacionRepository);
    execute(id: string): Promise<Investigacion | null>;
}
//# sourceMappingURL=InvestigacionUseCases.d.ts.map