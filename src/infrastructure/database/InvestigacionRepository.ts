import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../database/supabase';
import { Investigacion } from '../../domain/entities';
import { IInvestigacionRepository } from '../../domain/repositories';

export class InvestigacionRepository implements IInvestigacionRepository {
  private readonly table = 'investigaciones';

  async create(data: Omit<Investigacion, 'createdAt' | 'updatedAt'>): Promise<Investigacion> {
    const now = new Date();
    
    const { data: result, error } = await supabase
      .from(this.table)
      .insert({
        id_resource: data.id_resource,
        content_resource: data.content_resource,
        created_at: now,
        updated_at: now
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.mapToEntity(result);
  }

  async findAll(): Promise<Investigacion[]> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data.map(this.mapToEntity);
  }

  async findById(id: string): Promise<Investigacion | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id_resource', id)
      .single();

    if (error) return null;
    return this.mapToEntity(data);
  }

  private mapToEntity(data: any): Investigacion {
    return {
      id_resource: data.id_resource,
      content_resource: data.content_resource,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }
}