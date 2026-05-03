import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../database/supabase';
import { Screening, Question, OptionAnswer } from '../../domain/entities';
import { IScreeningRepository } from '../../domain/repositories';

export class ScreeningRepository implements IScreeningRepository {
  private readonly table = 'screenings';

  async create(data: Omit<Screening, 'id' | 'createdAt' | 'updatedAt'>): Promise<Screening> {
    const id = uuidv4();
    const now = new Date();
    
    const { data: result, error } = await supabase
      .from(this.table)
      .insert({ 
        id, 
        title: data.title, 
        description: data.description,
        sound: data.sound ?? '',
        questions: data.questions ?? [],
        options_answer: data.optionsAnswer ?? [],
        created_at: now, 
        updated_at: now 
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.mapToEntity(result);
  }

  async findAll(): Promise<Screening[]> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data.map(this.mapToEntity);
  }

  async findById(id: string): Promise<Screening | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return this.mapToEntity(data);
  }

  async update(id: string, data: Partial<Screening>): Promise<Screening> {
    const now = new Date();
    
    const updateData: any = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.questions !== undefined) updateData.questions = data.questions;
    if (data.optionsAnswer !== undefined) updateData.options_answer = data.optionsAnswer;
    updateData.updated_at = now;
    
    const { data: result, error } = await supabase
      .from(this.table)
      .update(updateData)
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

  private mapToEntity(data: any): Screening {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      sound: data.sound ?? '',
      questions: (data.questions as any[])?.map((q: any): Question => ({
        id: q.id ?? '',
        title: q.title ?? '',
        description: q.description ?? '',
        sound: q.sound ?? '',
        optionsAnswer: (q.optionsAnswer as any[])?.map((opt: any): OptionAnswer => ({
          id: opt.id ?? '',
          text: opt.text ?? '',
          value: opt.value ?? 0
        })) || []
      })) || [],
      optionsAnswer: (data.options_answer as any[])?.map((opt: any): OptionAnswer => ({
        id: opt.id ?? '',
        text: opt.text ?? '',
        value: opt.value ?? 0
      })) || [],
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }
}
