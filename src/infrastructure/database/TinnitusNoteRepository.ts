import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../database/supabase';
import { TinnitusNote } from '../../domain/entities';
import { ITinnitusNoteRepository } from '../../domain/repositories';
import { Logger } from '../logger/Logger';

export class TinnitusNoteRepository implements ITinnitusNoteRepository {
  private readonly table = 'tinnitus_notes';

  async create(data: Omit<TinnitusNote, 'id' | 'createdAt' | 'updatedAt'>): Promise<TinnitusNote> {
    const id = uuidv4();
    const now = new Date();

    Logger.info('Creando nota de tinnitus', { patientId: data.idPatient, questionnaireId: data.idTinnitusQuestionnaires });

    const insertData: any = {
        id,
        id_patient: data.idPatient,
        id_tinnitus_questionnaires: data.idTinnitusQuestionnaires,
        id_tinnitus_response: data.idTinnitusResponse,
        description: data.description,
        created_at: now,
        updated_at: now,
      };
    
    if (data.color !== undefined) insertData.color = data.color;
    if (data.source !== undefined) insertData.source = data.source;

    const { data: result, error } = await supabase
      .from(this.table)
      .insert(insertData)
      .select()
      .single();

    if (error) {
      Logger.danger('Error al crear nota de tinnitus', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Nota de tinnitus creada', { id });
    return this.mapToEntity(result);
  }

  async findAll(): Promise<TinnitusNote[]> {
    Logger.info('Obteniendo todas las notas de tinnitus');

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      Logger.danger('Error al obtener notas de tinnitus', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Notas de tinnitus obtenidas', { count: data.length });
    return data.map(this.mapToEntity);
  }

  async findById(id: string): Promise<TinnitusNote | null> {
    Logger.info('Obteniendo nota de tinnitus por ID', { id });

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      Logger.warning('Nota de tinnitus no encontrada', { id });
      return null;
    }

    Logger.success('Nota de tinnitus obtenida', { id });
    return this.mapToEntity(data);
  }

  async findByPatientId(patientId: string): Promise<TinnitusNote[]> {
    Logger.info('Obteniendo notas de tinnitus por paciente', { patientId });

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id_patient', patientId)
      .order('created_at', { ascending: false });

    if (error) {
      Logger.danger('Error al obtener notas de tinnitus por paciente', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Notas de tinnitus por paciente obtenidas', { count: data.length, patientId });
    return data.map(this.mapToEntity);
  }

  async findByTinnitusQuestionnaireId(questionnaireId: string): Promise<TinnitusNote[]> {
    Logger.info('Obteniendo notas de tinnitus por cuestionario', { questionnaireId });

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id_tinnitus_questionnaires', questionnaireId)
      .order('created_at', { ascending: false });

    if (error) {
      Logger.danger('Error al obtener notas de tinnitus por cuestionario', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Notas de tinnitus por cuestionario obtenidas', { count: data.length, questionnaireId });
    return data.map(this.mapToEntity);
  }

  async findByTinnitusResponseId(responseId: string): Promise<TinnitusNote[]> {
    Logger.info('Obteniendo notas de tinnitus por respuesta', { responseId });

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id_tinnitus_response', responseId)
      .order('created_at', { ascending: false });

    if (error) {
      Logger.danger('Error al obtener notas de tinnitus por respuesta', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Notas de tinnitus por respuesta obtenidas', { count: data.length, responseId });
    return data.map(this.mapToEntity);
  }

  async update(id: string, data: Partial<TinnitusNote>): Promise<TinnitusNote> {
    const now = new Date();

    Logger.info('Actualizando nota de tinnitus', { id });

    const updateData: any = { updated_at: now };
    if (data.idPatient !== undefined) updateData.id_patient = data.idPatient;
    if (data.idTinnitusQuestionnaires !== undefined) updateData.id_tinnitus_questionnaires = data.idTinnitusQuestionnaires;
    if (data.idTinnitusResponse !== undefined) updateData.id_tinnitus_response = data.idTinnitusResponse;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.color !== undefined && data.color !== null) updateData.color = data.color;
    if (data.source !== undefined && data.source !== null) updateData.source = data.source;

    const { data: result, error } = await supabase
      .from(this.table)
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      Logger.danger('Error al actualizar nota de tinnitus', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Nota de tinnitus actualizada', { id });
    return this.mapToEntity(result);
  }

  async delete(id: string): Promise<void> {
    Logger.info('Eliminando nota de tinnitus', { id });

    const { error } = await supabase
      .from(this.table)
      .delete()
      .eq('id', id);

    if (error) {
      Logger.danger('Error al eliminar nota de tinnitus', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Nota de tinnitus eliminada', { id });
  }

  private mapToEntity(data: any): TinnitusNote {
    return {
      id: data.id,
      idPatient: data.id_patient,
      idTinnitusQuestionnaires: data.id_tinnitus_questionnaires,
      idTinnitusResponse: data.id_tinnitus_response,
      description: data.description,
      color: data.color || undefined,
      source: data.source || undefined,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }
}