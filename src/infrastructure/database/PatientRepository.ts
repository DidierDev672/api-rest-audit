import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../database/supabase';
import { Patient, ParentInfo, PatientFamilyData } from '../../domain/entities';
import { IPatientRepository } from '../../domain/repositories';

export class PatientRepository implements IPatientRepository {
  private readonly table = 'patients';

  async create(data: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>): Promise<Patient> {
    const id = uuidv4();
    const now = new Date();
    
    const { data: result, error } = await supabase
      .from(this.table)
      .insert({ 
        id, 
        full_name: data.fullName,
        document_type: data.documentType,
        document_number: data.documentNumber,
        birth_date: data.birthDate.toISOString(),
        height: data.height,
        weight: data.weight,
        is_allergic: data.isAllergic,
        family_data: data.familyData,
        has_consent: data.hasConsent,
        created_at: now, 
        updated_at: now 
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.mapToEntity(result);
  }

  async findAll(): Promise<Patient[]> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data.map(this.mapToEntity);
  }

  async findById(id: string): Promise<Patient | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return this.mapToEntity(data);
  }

  async findByDocumentNumber(documentNumber: string): Promise<Patient | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('document_number', documentNumber)
      .single();

    if (error) return null;
    return this.mapToEntity(data);
  }

  async searchByName(name: string): Promise<Patient[]> {
    const query = name.trim();
    if (query.length < 2) return [];

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .ilike('full_name', `%${query}%`)
      .order('full_name', { ascending: true })
      .limit(25);

    if (error) throw new Error(error.message);
    return (data ?? []).map((row: Record<string, unknown>) => this.mapToEntity(row));
  }

  async update(id: string, data: Partial<Patient>): Promise<Patient> {
    const now = new Date();
    
    const updateData: any = {};
    if (data.fullName !== undefined) updateData.full_name = data.fullName;
    if (data.documentType !== undefined) updateData.document_type = data.documentType;
    if (data.documentNumber !== undefined) updateData.document_number = data.documentNumber;
    if (data.birthDate !== undefined) updateData.birth_date = data.birthDate.toISOString();
    if (data.height !== undefined) updateData.height = data.height;
    if (data.weight !== undefined) updateData.weight = data.weight;
    if (data.isAllergic !== undefined) updateData.is_allergic = data.isAllergic;
    if (data.familyData !== undefined) updateData.family_data = data.familyData;
    if (data.hasConsent !== undefined) updateData.has_consent = data.hasConsent;
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

  private mapToEntity(data: any): Patient {
    const familyData = data.family_data as PatientFamilyData;
    
    return {
      id: data.id,
      fullName: data.full_name,
      documentType: data.document_type,
      documentNumber: data.document_number,
      birthDate: new Date(data.birth_date),
      height: data.height,
      weight: data.weight,
      isAllergic: data.is_allergic,
      familyData: {
        father: {
          fullName: familyData?.father?.fullName || '',
          age: familyData?.father?.age || 0,
          diseases: familyData?.father?.diseases || [],
        },
        mother: {
          fullName: familyData?.mother?.fullName || '',
          age: familyData?.mother?.age || 0,
          diseases: familyData?.mother?.diseases || [],
        },
      },
      hasConsent: data.has_consent || false,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }
}
