import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../database/supabase';
import { AuditoryResearch } from '../../domain/entities';
import { IAuditoryResearchRepository } from '../../domain/repositories';

export class AuditoryResearchRepository implements IAuditoryResearchRepository {
  private readonly table = 'auditory_research';

  async create(data: Omit<AuditoryResearch, 'id' | 'createdAt' | 'updatedAt'>): Promise<AuditoryResearch> {
    const id = uuidv4();
    const now = new Date();
    
    const { data: result, error } = await supabase
      .from(this.table)
      .insert({ id, ...data, created_at: now, updated_at: now })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.mapToEntity(result);
  }

  async findAll(): Promise<AuditoryResearch[]> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data.map(this.mapToEntity);
  }

  async findById(id: string): Promise<AuditoryResearch | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return this.mapToEntity(data);
  }

  async update(id: string, data: Partial<AuditoryResearch>): Promise<AuditoryResearch> {
    const now = new Date();
    
    const { data: result, error } = await supabase
      .from(this.table)
      .update({ ...data, updated_at: now })
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

  private mapToEntity(data: any): AuditoryResearch {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }
}
