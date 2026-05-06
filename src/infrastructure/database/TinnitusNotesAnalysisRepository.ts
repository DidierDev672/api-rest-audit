import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../database/supabase';
import { TinnitusNotesAnalysis } from '../../domain/entities';
import { ITinnitusNotesAnalysisRepository } from '../../domain/repositories';
import { Logger } from '../logger/Logger';

export class TinnitusNotesAnalysisRepository implements ITinnitusNotesAnalysisRepository {
  private readonly table = 'tinnitus_notes_analysis';

  async create(data: Omit<TinnitusNotesAnalysis, 'id' | 'createdAt' | 'updatedAt'>): Promise<TinnitusNotesAnalysis> {
    const id = uuidv4();
    const now = new Date();

    Logger.info('Creando análisis de notas de tinnitus', { 
      patientId: data.idPatient, 
      questionnaireId: data.idTinnitusQuestionnaires,
      responseId: data.idTinnitusResponse 
    });

    const { data: result, error } = await supabase
      .from(this.table)
      .insert({
        id,
        id_patient: data.idPatient,
        id_tinnitus_questionnaires: data.idTinnitusQuestionnaires,
        id_tinnitus_response: data.idTinnitusResponse,
        analysis: data.analysis,
        note_count: data.noteCount,
        analyzed_at: data.analyzedAt || now,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (error) {
      Logger.danger('Error al crear análisis de notas de tinnitus', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Análisis de notas de tinnitus creado', { id });
    return this.mapToEntity(result);
  }

  async findAll(): Promise<TinnitusNotesAnalysis[]> {
    Logger.info('Obteniendo todos los análisis de notas de tinnitus');

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      Logger.danger('Error al obtener análisis de notas de tinnitus', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Análisis de notas de tinnitus obtenidos', { count: data.length });
    return data.map(this.mapToEntity);
  }

  async findById(id: string): Promise<TinnitusNotesAnalysis | null> {
    Logger.info('Obteniendo análisis de notas de tinnitus por ID', { id });

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      Logger.warning('Análisis de notas de tinnitus no encontrado', { id });
      return null;
    }

    Logger.success('Análisis de notas de tinnitus obtenido', { id });
    return this.mapToEntity(data);
  }

  async findByPatientId(patientId: string): Promise<TinnitusNotesAnalysis[]> {
    Logger.info('Obteniendo análisis de notas de tinnitus por paciente', { patientId });

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id_patient', patientId)
      .order('created_at', { ascending: false });

    if (error) {
      Logger.danger('Error al obtener análisis de notas de tinnitus por paciente', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Análisis de notas de tinnitus por paciente obtenidos', { count: data.length, patientId });
    return data.map(this.mapToEntity);
  }

  async findByTinnitusQuestionnaireId(questionnaireId: string): Promise<TinnitusNotesAnalysis[]> {
    Logger.info('Obteniendo análisis de notas de tinnitus por cuestionario', { questionnaireId });

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id_tinnitus_questionnaires', questionnaireId)
      .order('created_at', { ascending: false });

    if (error) {
      Logger.danger('Error al obtener análisis de notas de tinnitus por cuestionario', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Análisis de notas de tinnitus por cuestionario obtenidos', { count: data.length, questionnaireId });
    return data.map(this.mapToEntity);
  }

  async findByTinnitusResponseId(responseId: string): Promise<TinnitusNotesAnalysis[]> {
    Logger.info('Obteniendo análisis de notas de tinnitus por respuesta', { responseId });

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id_tinnitus_response', responseId)
      .order('created_at', { ascending: false });

    if (error) {
      Logger.danger('Error al obtener análisis de notas de tinnitus por respuesta', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Análisis de notas de tinnitus por respuesta obtenidos', { count: data.length, responseId });
    return data.map(this.mapToEntity);
  }

  async update(id: string, data: Partial<TinnitusNotesAnalysis>): Promise<TinnitusNotesAnalysis> {
    const now = new Date();

    Logger.info('Actualizando análisis de notas de tinnitus', { id });

    const updateData: any = { updated_at: now };
    if (data.idPatient !== undefined) updateData.id_patient = data.idPatient;
    if (data.idTinnitusQuestionnaires !== undefined) updateData.id_tinnitus_questionnaires = data.idTinnitusQuestionnaires;
    if (data.idTinnitusResponse !== undefined) updateData.id_tinnitus_response = data.idTinnitusResponse;
    if (data.analysis !== undefined) updateData.analysis = data.analysis;
    if (data.noteCount !== undefined) updateData.note_count = data.noteCount;
    if (data.analyzedAt !== undefined) updateData.analyzed_at = data.analyzedAt;
    if (data.createdBy !== undefined) updateData.created_by = data.createdBy;

    const { data: result, error } = await supabase
      .from(this.table)
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      Logger.danger('Error al actualizar análisis de notas de tinnitus', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Análisis de notas de tinnitus actualizado', { id });
    return this.mapToEntity(result);
  }

  async delete(id: string): Promise<void> {
    Logger.info('Eliminando análisis de notas de tinnitus', { id });

    const { error } = await supabase
      .from(this.table)
      .delete()
      .eq('id', id);

    if (error) {
      Logger.danger('Error al eliminar análisis de notas de tinnitus', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Análisis de notas de tinnitus eliminado', { id });
  }

  private mapToEntity(data: any): TinnitusNotesAnalysis {
    return {
      id: data.id,
      idPatient: data.id_patient,
      idTinnitusQuestionnaires: data.id_tinnitus_questionnaires,
      idTinnitusResponse: data.id_tinnitus_response,
      analysis: data.analysis,
      noteCount: data.note_count,
      analyzedAt: data.analyzed_at ? new Date(data.analyzed_at) : undefined,
      createdBy: data.created_by,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }
}
