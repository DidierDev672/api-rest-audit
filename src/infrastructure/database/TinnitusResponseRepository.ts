import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../database/supabase';
import { TinnitusResponse, Answer } from '../../domain/entities';
import { ITinnitusResponseRepository } from '../../domain/repositories';

export class TinnitusResponseRepository implements ITinnitusResponseRepository {
  private readonly table = 'tinnitus_responses';

  async create(data: Omit<TinnitusResponse, 'id' | 'createdAt' | 'updatedAt'>): Promise<TinnitusResponse> {
    const id = uuidv4();
    const now = new Date();
    
    const { data: result, error } = await supabase
      .from(this.table)
      .insert({ 
        id, 
        id_patient: data.idPatient, 
        id_tinnitus_questionnaires: data.idTinnitusQuestionnaires,
        answer: data.answer,
        created_at: now, 
        updated_at: now 
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.mapToEntity(result);
  }

  async findAll(): Promise<TinnitusResponse[]> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data.map(this.mapToEntity);
  }

  async findById(id: string): Promise<TinnitusResponse | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return this.mapToEntity(data);
  }

  async findByPatientId(patientId: string): Promise<TinnitusResponse[]> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id_patient', patientId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data.map(this.mapToEntity);
  }

  async findByQuestionnaireId(questionnaireId: string): Promise<TinnitusResponse[]> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id_tinnitus_questionnaires', questionnaireId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data.map(this.mapToEntity);
  }

  async update(id: string, data: Partial<TinnitusResponse>): Promise<TinnitusResponse> {
    const now = new Date();
    
    const updateData: any = {
      updated_at: now 
    };

    if (data.idPatient) updateData.id_patient = data.idPatient;
    if (data.idTinnitusQuestionnaires) updateData.id_tinnitus_questionnaires = data.idTinnitusQuestionnaires;
    if (data.answer) updateData.answer = data.answer;
    
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

  private mapToEntity(data: any): TinnitusResponse {
    return {
      id: data.id,
      idPatient: data.id_patient,
      idTinnitusQuestionnaires: data.id_tinnitus_questionnaires,
      answer: data.answer as Answer[],
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }
}