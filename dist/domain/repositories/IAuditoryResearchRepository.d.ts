import { AuditoryResearch } from '../entities';
export interface IAuditoryResearchRepository {
    create(research: Omit<AuditoryResearch, 'id' | 'createdAt' | 'updatedAt'>): Promise<AuditoryResearch>;
    findAll(): Promise<AuditoryResearch[]>;
    findById(id: string): Promise<AuditoryResearch | null>;
    update(id: string, research: Partial<AuditoryResearch>): Promise<AuditoryResearch>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=IAuditoryResearchRepository.d.ts.map