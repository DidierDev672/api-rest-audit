import { Screening } from '../../domain/entities';
import { IScreeningRepository } from '../../domain/repositories';
export declare class ScreeningRepository implements IScreeningRepository {
    private readonly table;
    create(data: Omit<Screening, 'id' | 'createdAt' | 'updatedAt'>): Promise<Screening>;
    findAll(): Promise<Screening[]>;
    findById(id: string): Promise<Screening | null>;
    update(id: string, data: Partial<Screening>): Promise<Screening>;
    delete(id: string): Promise<void>;
    private mapToEntity;
}
//# sourceMappingURL=ScreeningRepository.d.ts.map