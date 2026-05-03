import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../database/supabase';
import { TinnitusQuestionnaire, Question } from '../../domain/entities';
import { ITinnitusQuestionnaireRepository } from '../../domain/repositories';

export class TinnitusQuestionnaireRepository implements ITinnitusQuestionnaireRepository {
  private readonly table = 'tinnitus_questionnaires';

  async create(data: Omit<TinnitusQuestionnaire, 'id' | 'createdAt' | 'updatedAt'>): Promise<TinnitusQuestionnaire> {
    const id = uuidv4();
    const now = new Date();
    
    const { data: result, error } = await supabase
      .from(this.table)
      .insert({ 
        id, 
        title: data.title, 
        description: data.description,
        questions: data.questions,
        created_at: now, 
        updated_at: now 
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.mapToEntity(result);
  }

  async findAll(): Promise<TinnitusQuestionnaire[]> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data.map(this.mapToEntity);
  }

  async findById(id: string): Promise<TinnitusQuestionnaire | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return this.mapToEntity(data);
  }

  async update(id: string, data: Partial<TinnitusQuestionnaire>): Promise<TinnitusQuestionnaire> {
    const now = new Date();
    
    const { data: result, error } = await supabase
      .from(this.table)
      .update({ 
        title: data.title, 
        description: data.description,
        questions: data.questions,
        updated_at: now 
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.mapToEntity(result);
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from(this.table)
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }

  private mapToEntity(data: any): TinnitusQuestionnaire {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      questions: data.questions as Question[],
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }
}
