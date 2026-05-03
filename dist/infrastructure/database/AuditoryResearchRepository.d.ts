import { AuditoryResearch } from '../../domain/entities';
import { IAuditoryResearchRepository } from '../../domain/repositories';
export declare class AuditoryResearchRepository implements IAuditoryResearchRepository {
    private readonly table;
    create(data: Omit<AuditoryResearch, 'id' | 'createdAt' | 'updatedAt'>): Promise<AuditoryResearch>;
    findAll(): Promise<AuditoryResearch[]>;
    findById(id: string): Promise<AuditoryResearch | null>;
    update(id: string, data: Partial<AuditoryResearch>): Promise<AuditoryResearch>;
    delete(id: string): Promise<void>;
    private mapToEntity;
}
//# sourceMappingURL=AuditoryResearchRepository.d.ts.map