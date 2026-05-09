import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../database/supabase';
import { PatientTinnitusAssignment } from '../../domain/entities';
import { IPatientTinnitusAssignmentRepository } from '../../domain/repositories';

export class PatientTinnitusAssignmentRepository implements IPatientTinnitusAssignmentRepository {
  private readonly table = 'patient_tinnitus_assignments';

  async create(data: Omit<PatientTinnitusAssignment, 'id' | 'createdAt' | 'updatedAt'>): Promise<PatientTinnitusAssignment> {
    const id = uuidv4();
    const now = new Date();

    const { data: result, error } = await supabase
      .from(this.table)
      .insert({
        id,
        id_patient: data.idPatient,
        id_tinnitus_questionnaires: data.idTinnitusQuestionnaires,
        status: data.status ?? 'active',
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.mapToEntity(result);
  }

  async findByPatientId(idPatient: string): Promise<PatientTinnitusAssignment[]> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id_patient', idPatient)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data.map(this.mapToEntity);
  }

  async findByTinnitusId(idTinnitus: string): Promise<PatientTinnitusAssignment[]> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id_tinnitus_questionnaires', idTinnitus)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data.map(this.mapToEntity);
  }

  async findById(id: string): Promise<PatientTinnitusAssignment | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return this.mapToEntity(data);
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from(this.table)
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }

  async deleteByPatientId(idPatient: string): Promise<void> {
    const { error } = await supabase
      .from(this.table)
      .delete()
      .eq('id_patient', idPatient);

    if (error) throw new Error(error.message);
  }

  async deleteByTinnitusId(idTinnitus: string): Promise<void> {
    const { error } = await supabase
      .from(this.table)
      .delete()
      .eq('id_tinnitus_questionnaires', idTinnitus);

    if (error) throw new Error(error.message);
  }

  async update(id: string, data: Partial<PatientTinnitusAssignment>): Promise<PatientTinnitusAssignment> {
    const now = new Date();
    const updateData: Record<string, any> = { updated_at: now };

    if (data.status !== undefined) updateData.status = data.status;
    if (data.idPatient !== undefined) updateData.id_patient = data.idPatient;
    if (data.idTinnitusQuestionnaires !== undefined) updateData.id_tinnitus_questionnaires = data.idTinnitusQuestionnaires;

    const { data: result, error } = await supabase
      .from(this.table)
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.mapToEntity(result);
  }

  private mapToEntity(data: any): PatientTinnitusAssignment {
    return {
      id: data.id,
      idPatient: data.id_patient,
      idTinnitusQuestionnaires: data.id_tinnitus_questionnaires,
      status: data.status ?? 'active',
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }
}
