import { Screening, Question } from "../entities";
import { IScreeningRepository } from "../repositories";
export declare class CreateScreeningUseCase {
    private readonly repository;
    constructor(repository: IScreeningRepository);
    execute(data: {
        title: string;
        description: string;
        questions: Question[];
    }): Promise<Screening>;
}
export declare class GetAllScreeningsUseCase {
    private readonly repository;
    constructor(repository: IScreeningRepository);
    execute(): Promise<Screening[]>;
}
export declare class GetScreeningByIdUseCase {
    private readonly repository;
    constructor(repository: IScreeningRepository);
    execute(id: string): Promise<Screening | null>;
}
export declare class UpdateScreeningUseCase {
    private readonly repository;
    constructor(repository: IScreeningRepository);
    execute(id: string, data: Partial<Screening>): Promise<Screening>;
}
export declare class DeleteScreeningUseCase {
    private readonly repository;
    constructor(repository: IScreeningRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=ScreeningUseCases.d.ts.map