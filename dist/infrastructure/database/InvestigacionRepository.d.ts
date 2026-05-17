import { Investigacion } from '../../domain/entities';
import { IInvestigacionRepository } from '../../domain/repositories';
export declare class InvestigacionRepository implements IInvestigacionRepository {
    private readonly table;
    create(data: Omit<Investigacion, 'createdAt' | 'updatedAt'>): Promise<Investigacion>;
    findAll(): Promise<Investigacion[]>;
    findById(id: string): Promise<Investigacion | null>;
    findAllById(id: string): Promise<Investigacion[] | null>;
    update(id_resource: string, data: Partial<Investigacion>): Promise<Investigacion>;
    delete(id_resource: string): Promise<void>;
    private mapToEntity;
}
//# sourceMappingURL=InvestigacionRepository.d.ts.map