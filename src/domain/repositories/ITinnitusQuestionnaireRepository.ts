import { TinnitusQuestionnaire } from '../entities';

export interface ITinnitusQuestionnaireRepository {
  create(questionnaire: Omit<TinnitusQuestionnaire, 'id' | 'createdAt' | 'updatedAt'>): Promise<TinnitusQuestionnaire>;
  findAll(): Promise<TinnitusQuestionnaire[]>;
  findById(id: string): Promise<TinnitusQuestionnaire | null>;
  update(id: string, questionnaire: Partial<TinnitusQuestionnaire>): Promise<TinnitusQuestionnaire>;
  delete(id: string): Promise<void>;
}
