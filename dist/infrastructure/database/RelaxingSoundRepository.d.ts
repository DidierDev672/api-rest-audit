import { RelaxingSound } from '../../domain/entities';
import { IRelaxingSoundRepository } from '../../domain/repositories';
export declare class RelaxingSoundRepository implements IRelaxingSoundRepository {
    private readonly table;
    create(data: Omit<RelaxingSound, 'id' | 'createdAt' | 'updatedAt'>): Promise<RelaxingSound>;
    findAll(): Promise<RelaxingSound[]>;
    findById(id: string): Promise<RelaxingSound | null>;
    update(id: string, data: Partial<RelaxingSound>): Promise<RelaxingSound>;
    delete(id: string): Promise<void>;
    private mapToEntity;
}
//# sourceMappingURL=RelaxingSoundRepository.d.ts.map