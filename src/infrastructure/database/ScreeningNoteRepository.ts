import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../database/supabase';
import { ScreeningNote } from '../../domain/entities';
import { IScreeningNoteRepository } from '../../domain/repositories';
import { Logger } from '../logger/Logger';

export class ScreeningNoteRepository implements IScreeningNoteRepository {
  private readonly table = 'screening_notes';

  async create(data: Omit<ScreeningNote, 'id' | 'createdAt' | 'updatedAt'>): Promise<ScreeningNote> {
    const id = uuidv4();
    const now = new Date();

    Logger.info('Creando nota de tamizaje', { patientId: data.idPatient, screeningId: data.idScreening });

    const { data: result, error } = await supabase
      .from(this.table)
      .insert({
        id,
        id_patient: data.idPatient,
        id_screening: data.idScreening,
        id_doctor: data.idDoctor,
        title_note: data.titleNote,
        description_note: data.descriptionNote,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (error) {
      Logger.danger('Error al crear nota de tamizaje', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Nota de tamizaje creada', { id });
    return this.mapToEntity(result);
  }

  async findAll(): Promise<ScreeningNote[]> {
    Logger.info('Obteniendo todas las notas de tamizaje');

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      Logger.danger('Error al obtener notas de tamizaje', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Notas de tamizaje obtenidas', { count: data.length });
    return data.map(this.mapToEntity);
  }

  async findById(id: string): Promise<ScreeningNote | null> {
    Logger.info('Obteniendo nota de tamizaje por ID', { id });

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      Logger.warning('Nota de tamizaje no encontrada', { id });
      return null;
    }

    Logger.success('Nota de tamizaje obtenida', { id });
    return this.mapToEntity(data);
  }

  async findByPatientId(patientId: string): Promise<ScreeningNote[]> {
    Logger.info('Obteniendo notas de tamizaje por paciente', { patientId });

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id_patient', patientId)
      .order('created_at', { ascending: false });

    if (error) {
      Logger.danger('Error al obtener notas de tamizaje por paciente', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Notas de tamizaje por paciente obtenidas', { count: data.length, patientId });
    return data.map(this.mapToEntity);
  }

  async findByScreeningId(screeningId: string): Promise<ScreeningNote[]> {
    Logger.info('Obteniendo notas de tamizaje por tamizaje', { screeningId });

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id_screening', screeningId)
      .order('created_at', { ascending: false });

    if (error) {
      Logger.danger('Error al obtener notas de tamizaje por tamizaje', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Notas de tamizaje por tamizaje obtenidas', { count: data.length, screeningId });
    return data.map(this.mapToEntity);
  }

  async update(id: string, data: Partial<ScreeningNote>): Promise<ScreeningNote> {
    const now = new Date();

    Logger.info('Actualizando nota de tamizaje', { id });

    const updateData: any = { updated_at: now };
    if (data.idPatient !== undefined) updateData.id_patient = data.idPatient;
    if (data.idScreening !== undefined) updateData.id_screening = data.idScreening;
    if (data.idDoctor !== undefined) updateData.id_doctor = data.idDoctor;
    if (data.titleNote !== undefined) updateData.title_note = data.titleNote;
    if (data.descriptionNote !== undefined) updateData.description_note = data.descriptionNote;

    const { data: result, error } = await supabase
      .from(this.table)
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      Logger.danger('Error al actualizar nota de tamizaje', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Nota de tamizaje actualizada', { id });
    return this.mapToEntity(result);
  }

  async delete(id: string): Promise<void> {
    Logger.info('Eliminando nota de tamizaje', { id });

    const { error } = await supabase
      .from(this.table)
      .delete()
      .eq('id', id);

    if (error) {
      Logger.danger('Error al eliminar nota de tamizaje', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Nota de tamizaje eliminada', { id });
  }

  private mapToEntity(data: any): ScreeningNote {
    return {
      id: data.id,
      idPatient: data.id_patient,
      idScreening: data.id_screening,
      idDoctor: data.id_doctor,
      titleNote: data.title_note,
      descriptionNote: data.description_note,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }
}
