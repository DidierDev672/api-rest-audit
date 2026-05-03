import { v4 as uuidv4 } from 'uuid';
import { supabase } from './supabase';
import { PatientLogin, PermitRole } from '../../domain/entities';
import { IPatientLoginRepository, CreatePatientLoginData } from '../../domain/repositories';

export class PatientLoginRepository implements IPatientLoginRepository {
  private readonly table = 'patient_login';

  async create(data: CreatePatientLoginData): Promise<PatientLogin> {
    const id = uuidv4();
    const now = new Date();

    const { data: result, error } = await supabase
      .from(this.table)
      .insert({
        id,
        id_patient: data.idPatient,
        email: data.email,
        username: data.username,
        password: data.password,
        permits: data.permits,
        token: null,
        has_consent: data.hasConsent,
        created_at: now.toISOString(),
        updated_at: now.toISOString(),
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.mapToEntity(result);
  }

  async findByEmail(email: string): Promise<PatientLogin | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('email', email)
      .single();

    if (error) return null;
    return this.mapToEntity(data);
  }

  async findByUsername(username: string): Promise<PatientLogin | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('username', username)
      .single();

    if (error) return null;
    return this.mapToEntity(data);
  }

  async findByIdPatient(idPatient: string): Promise<PatientLogin | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id_patient', idPatient)
      .single();

    if (error) return null;
    return this.mapToEntity(data);
  }

  async updateToken(id: string, token: string): Promise<PatientLogin> {
    const now = new Date();

    const { data, error } = await supabase
      .from(this.table)
      .update({ token, updated_at: now.toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.mapToEntity(data);
  }

  async clearToken(id: string): Promise<void> {
    const now = new Date();

    const { error } = await supabase
      .from(this.table)
      .update({ token: null, updated_at: now.toISOString() })
      .eq('id', id);

    if (error) throw new Error(error.message);
  }

  async findByToken(token: string): Promise<PatientLogin | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('token', token)
      .single();

    if (error) return null;
    return this.mapToEntity(data);
  }

  private mapToEntity(data: any): PatientLogin {
    return {
      id: data.id,
      idPatient: data.id_patient,
      email: data.email,
      username: data.username,
      password: data.password,
      permits: data.permits as PermitRole[],
      token: data.token,
      hasConsent: data.has_consent || false,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }
}
