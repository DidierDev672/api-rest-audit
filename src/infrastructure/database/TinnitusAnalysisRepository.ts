import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../database/supabase';
import { TinnitusAnalysis } from '../../domain/entities';
import { ITinnitusAnalysisRepository } from '../../domain/repositories';
import { Logger } from '../logger/Logger';

export class TinnitusAnalysisRepository implements ITinnitusAnalysisRepository {
  private readonly table = 'tinnitus_analysis';

  async create(data: Omit<TinnitusAnalysis, 'id' | 'createdAt' | 'updatedAt'>): Promise<TinnitusAnalysis> {
    const id = uuidv4();
    const now = new Date();

    Logger.info('Creando análisis de tinnitus', { patientId: data.idPatient, questionnaireId: data.idTinnitusQuestionnaires });

    const { data: result, error } = await supabase
      .from(this.table)
      .insert({
        id,
        id_patient: data.idPatient,
        id_tinnitus_questionnaires: data.idTinnitusQuestionnaires,
        id_tinnitus_response: data.idTinnitusResponse,
        analysis: data.analysis,
        model: data.model,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (error) {
      Logger.danger('Error al crear análisis de tinnitus', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Análisis de tinnitus creado', { id });
    return this.mapToEntity(result);
  }

  async findAll(): Promise<TinnitusAnalysis[]> {
    Logger.info('Obteniendo todos los análisis de tinnitus');

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      Logger.danger('Error al obtener análisis de tinnitus', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Análisis de tinnitus obtenidos', { count: data.length });
    return data.map(this.mapToEntity);
  }

  async findById(id: string): Promise<TinnitusAnalysis | null> {
    Logger.info('Obteniendo análisis de tinnitus por ID', { id });

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      Logger.warning('Análisis de tinnitus no encontrado', { id });
      return null;
    }

    Logger.success('Análisis de tinnitus obtenido', { id });
    return this.mapToEntity(data);
  }

  async findByPatientId(patientId: string): Promise<TinnitusAnalysis[]> {
    Logger.info('Obteniendo análisis de tinnitus por paciente', { patientId });

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id_patient', patientId)
      .order('created_at', { ascending: false });

    if (error) {
      Logger.danger('Error al obtener análisis de tinnitus por paciente', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Análisis de tinnitus por paciente obtenidos', { count: data.length, patientId });
    return data.map(this.mapToEntity);
  }

  async findByTinnitusQuestionnaireId(questionnaireId: string): Promise<TinnitusAnalysis[]> {
    Logger.info('Obteniendo análisis de tinnitus por cuestionario', { questionnaireId });

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id_tinnitus_questionnaires', questionnaireId)
      .order('created_at', { ascending: false });

    if (error) {
      Logger.danger('Error al obtener análisis de tinnitus por cuestionario', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Análisis de tinnitus por cuestionario obtenidos', { count: data.length, questionnaireId });
    return data.map(this.mapToEntity);
  }

  async findByTinnitusResponseId(responseId: string): Promise<TinnitusAnalysis[]> {
    Logger.info('Obteniendo análisis de tinnitus por respuesta', { responseId });

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id_tinnitus_response', responseId)
      .order('created_at', { ascending: false });

    if (error) {
      Logger.danger('Error al obtener análisis de tinnitus por respuesta', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Análisis de tinnitus por respuesta obtenidos', { count: data.length, responseId });
    return data.map(this.mapToEntity);
  }

  async update(id: string, data: Partial<TinnitusAnalysis>): Promise<TinnitusAnalysis> {
    const now = new Date();

    Logger.info('Actualizando análisis de tinnitus', { id });

    const updateData: any = { updated_at: now };
    if (data.idPatient !== undefined) updateData.id_patient = data.idPatient;
    if (data.idTinnitusQuestionnaires !== undefined) updateData.id_tinnitus_questionnaires = data.idTinnitusQuestionnaires;
    if (data.idTinnitusResponse !== undefined) updateData.id_tinnitus_response = data.idTinnitusResponse;
    if (data.analysis !== undefined) updateData.analysis = data.analysis;
    if (data.model !== undefined) updateData.model = data.model;

    const { data: result, error } = await supabase
      .from(this.table)
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      Logger.danger('Error al actualizar análisis de tinnitus', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Análisis de tinnitus actualizado', { id });
    return this.mapToEntity(result);
  }

  async delete(id: string): Promise<void> {
    Logger.info('Eliminando análisis de tinnitus', { id });

    const { error } = await supabase
      .from(this.table)
      .delete()
      .eq('id', id);

    if (error) {
      Logger.danger('Error al eliminar análisis de tinnitus', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Análisis de tinnitus eliminado', { id });
  }

  private mapToEntity(data: any): TinnitusAnalysis {
    return {
      id: data.id,
      idPatient: data.id_patient,
      idTinnitusQuestionnaires: data.id_tinnitus_questionnaires,
      idTinnitusResponse: data.id_tinnitus_response,
      analysis: data.analysis,
      model: data.model,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }
}