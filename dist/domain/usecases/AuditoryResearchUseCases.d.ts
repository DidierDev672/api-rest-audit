import { AuditoryResearch } from '../entities';
import { IAuditoryResearchRepository } from '../repositories';
export declare class CreateAuditoryResearchUseCase {
    private readonly repository;
    constructor(repository: IAuditoryResearchRepository);
    execute(data: {
        name: string;
        description: string;
    }): Promise<AuditoryResearch>;
}
export declare class GetAllAuditoryResearchUseCase {
    private readonly repository;
    constructor(repository: IAuditoryResearchRepository);
    execute(): Promise<AuditoryResearch[]>;
}
export declare class GetAuditoryResearchByIdUseCase {
    private readonly repository;
    constructor(repository: IAuditoryResearchRepository);
    execute(id: string): Promise<AuditoryResearch | null>;
}
export declare class UpdateAuditoryResearchUseCase {
    private readonly repository;
    constructor(repository: IAuditoryResearchRepository);
    execute(id: string, data: Partial<AuditoryResearch>): Promise<AuditoryResearch>;
}
export declare class DeleteAuditoryResearchUseCase {
    private readonly repository;
    constructor(repository: IAuditoryResearchRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=AuditoryResearchUseCases.d.ts.map