import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../database/supabase';
import { PatientScreeningAssignment } from '../../domain/entities';
import { IPatientScreeningAssignmentRepository } from '../../domain/repositories';

export class PatientScreeningAssignmentRepository implements IPatientScreeningAssignmentRepository {
  private readonly table = 'patient_screening_assignments';

  async create(data: Omit<PatientScreeningAssignment, 'id' | 'createdAt' | 'updatedAt'>): Promise<PatientScreeningAssignment> {
    const id = uuidv4();
    const now = new Date();

    const { data: result, error } = await supabase
      .from(this.table)
      .insert({
        id,
        patient_id: data.patientId,
        screening_ids: data.screeningIds,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.mapToEntity(result);
  }

  async findByPatientId(patientId: string): Promise<PatientScreeningAssignment[]> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data.map(this.mapToEntity);
  }

  async findById(id: string): Promise<PatientScreeningAssignment | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return this.mapToEntity(data);
  }

  async update(id: string, data: Partial<PatientScreeningAssignment>): Promise<PatientScreeningAssignment> {
    const now = new Date();

    const updateData: any = {};
    if (data.patientId !== undefined) updateData.patient_id = data.patientId;
    if (data.screeningIds !== undefined) updateData.screening_ids = data.screeningIds;
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

  async deleteByPatientId(patientId: string): Promise<void> {
    const { error } = await supabase
      .from(this.table)
      .delete()
      .eq('patient_id', patientId);

    if (error) throw new Error(error.message);
  }

  private mapToEntity(data: any): PatientScreeningAssignment {
    return {
      id: data.id,
      patientId: data.patient_id,
      screeningIds: data.screening_ids || [],
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }
}
