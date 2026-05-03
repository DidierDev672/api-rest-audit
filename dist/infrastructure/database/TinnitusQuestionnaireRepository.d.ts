import { TinnitusQuestionnaire } from '../../domain/entities';
import { ITinnitusQuestionnaireRepository } from '../../domain/repositories';
export declare class TinnitusQuestionnaireRepository implements ITinnitusQuestionnaireRepository {
    private readonly table;
    create(data: Omit<TinnitusQuestionnaire, 'id' | 'createdAt' | 'updatedAt'>): Promise<TinnitusQuestionnaire>;
    findAll(): Promise<TinnitusQuestionnaire[]>;
    findById(id: string): Promise<TinnitusQuestionnaire | null>;
    update(id: string, data: Partial<TinnitusQuestionnaire>): Promise<TinnitusQuestionnaire>;
    delete(id: string): Promise<void>;
    private mapToEntity;
}
//# sourceMappingURL=TinnitusQuestionnaireRepository.d.ts.map