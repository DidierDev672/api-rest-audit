import { RelaxingSound } from '../entities';
import { IRelaxingSoundRepository } from '../repositories';
export declare class CreateRelaxingSoundUseCase {
    private readonly repository;
    constructor(repository: IRelaxingSoundRepository);
    execute(data: {
        title: string;
        description: string;
        sound: string;
    }): Promise<RelaxingSound>;
}
export declare class GetAllRelaxingSoundsUseCase {
    private readonly repository;
    constructor(repository: IRelaxingSoundRepository);
    execute(): Promise<RelaxingSound[]>;
}
export declare class GetRelaxingSoundByIdUseCase {
    private readonly repository;
    constructor(repository: IRelaxingSoundRepository);
    execute(id: string): Promise<RelaxingSound | null>;
}
export declare class UpdateRelaxingSoundUseCase {
    private readonly repository;
    constructor(repository: IRelaxingSoundRepository);
    execute(id: string, data: Partial<RelaxingSound>): Promise<RelaxingSound>;
}
export declare class DeleteRelaxingSoundUseCase {
    private readonly repository;
    constructor(repository: IRelaxingSoundRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=RelaxingSoundUseCases.d.ts.map