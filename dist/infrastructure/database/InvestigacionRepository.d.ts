import { Investigacion } from '../../domain/entities';
import { IInvestigacionRepository } from '../../domain/repositories';
export declare class InvestigacionRepository implements IInvestigacionRepository {
    private readonly table;
    create(data: Omit<Investigacion, 'createdAt' | 'updatedAt'>): Promise<Investigacion>;
    findAll(): Promise<Investigacion[]>;
    findById(id: string): Promise<Investigacion | null>;
    private mapToEntity;
}
//# sourceMappingURL=InvestigacionRepository.d.ts.map