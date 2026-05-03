import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../database/supabase';
import { Doctor, DoctorDocumentType, Gender } from '../../domain/entities';
import { IDoctorRepository } from '../../domain/repositories';
import { Logger } from '../logger/Logger';

export class DoctorRepository implements IDoctorRepository {
  private readonly table = 'doctors';

  async create(data: Omit<Doctor, 'id' | 'createdAt' | 'updatedAt'>): Promise<Doctor> {
    const id = uuidv4();
    const now = new Date();

    Logger.info('Creando médico', { fullName: data.fullName, documentNumber: data.documentNumber });

    const { data: result, error } = await supabase
      .from(this.table)
      .insert({
        id,
        document_type: data.documentType,
        document_number: data.documentNumber,
        full_name: data.fullName,
        birth_date: data.birthDate.toISOString().split('T')[0],
        gender: data.gender,
        email: data.email,
        phone: data.phone || null,
        address: data.address || null,
        is_active: data.isActive,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (error) {
      Logger.danger('Error al crear médico', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Médico creado', { id });
    return this.mapToEntity(result);
  }

  async findAll(): Promise<Doctor[]> {
    Logger.info('Obteniendo todos los médicos');

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      Logger.danger('Error al obtener médicos', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Médicos obtenidos', { count: data.length });
    return data.map(this.mapToEntity);
  }

  async findById(id: string): Promise<Doctor | null> {
    Logger.info('Obteniendo médico por ID', { id });

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      Logger.warning('Médico no encontrado', { id });
      return null;
    }

    Logger.success('Médico obtenido', { id });
    return this.mapToEntity(data);
  }

  async findByDocumentNumber(documentNumber: string): Promise<Doctor | null> {
    Logger.info('Obteniendo médico por número de documento', { documentNumber });

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('document_number', documentNumber)
      .single();

    if (error) {
      return null;
    }

    return this.mapToEntity(data);
  }

  async findByEmail(email: string): Promise<Doctor | null> {
    Logger.info('Obteniendo médico por email', { email });

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      return null;
    }

    return this.mapToEntity(data);
  }

  async update(id: string, data: Partial<Doctor>): Promise<Doctor> {
    const now = new Date();

    Logger.info('Actualizando médico', { id });

    const updateData: any = { updated_at: now };
    if (data.documentType !== undefined) updateData.document_type = data.documentType;
    if (data.documentNumber !== undefined) updateData.document_number = data.documentNumber;
    if (data.fullName !== undefined) updateData.full_name = data.fullName;
    if (data.birthDate !== undefined) updateData.birth_date = data.birthDate.toISOString().split('T')[0];
    if (data.gender !== undefined) updateData.gender = data.gender;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.address !== undefined) updateData.address = data.address;
    if (data.isActive !== undefined) updateData.is_active = data.isActive;

    const { data: result, error } = await supabase
      .from(this.table)
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      Logger.danger('Error al actualizar médico', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Médico actualizado', { id });
    return this.mapToEntity(result);
  }

  async delete(id: string): Promise<void> {
    Logger.info('Eliminando médico', { id });

    const { error } = await supabase
      .from(this.table)
      .delete()
      .eq('id', id);

    if (error) {
      Logger.danger('Error al eliminar médico', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Médico eliminado', { id });
  }

  private mapToEntity(data: any): Doctor {
    return {
      id: data.id,
      documentType: data.document_type as DoctorDocumentType,
      documentNumber: data.document_number,
      fullName: data.full_name,
      birthDate: new Date(data.birth_date),
      gender: data.gender as Gender,
      email: data.email,
      phone: data.phone,
      address: data.address,
      isActive: data.is_active,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }
}
