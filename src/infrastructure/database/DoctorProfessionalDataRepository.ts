import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../database/supabase';
import { DoctorProfessionalData, DoctorCertification, RegistrationStatus } from '../../domain/entities';
import { IDoctorProfessionalDataRepository } from '../../domain/repositories';
import { Logger } from '../logger/Logger';

export class DoctorProfessionalDataRepository implements IDoctorProfessionalDataRepository {
  private readonly table = 'doctor_professional_data';

  async create(data: Omit<DoctorProfessionalData, 'id' | 'createdAt' | 'updatedAt'>): Promise<DoctorProfessionalData> {
    const id = uuidv4();
    const now = new Date();

    Logger.info('Creando datos profesionales del médico', { doctorId: data.doctorId });

    const { data: result, error } = await supabase
      .from(this.table)
      .insert({
        id,
        id_doctor: data.doctorId,
        professional_title: data.professionalTitle,
        university: data.university,
        country: data.country,
        graduation_year: data.graduationYear,
        professional_card_number: data.professionalCardNumber,
        rethus_registration: data.rethusRegistration,
        registration_status: data.registrationStatus,
        medical_specialty: data.medicalSpecialty || null,
        subspecialty: data.subspecialty || null,
        additional_certifications: data.additionalCertifications,
        diploma_url: data.diplomaUrl || null,
        degree_certificate_url: data.degreeCertificateUrl || null,
        specialty_certificates_url: data.specialtyCertificatesUrl,
        is_verified: data.isVerified,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (error) {
      Logger.danger('Error al crear datos profesionales', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Datos profesionales creados', { id });
    return this.mapToEntity(result);
  }

  async findAll(): Promise<DoctorProfessionalData[]> {
    Logger.info('Obteniendo todos los datos profesionales');

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      Logger.danger('Error al obtener datos profesionales', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Datos profesionales obtenidos', { count: data.length });
    return data.map(this.mapToEntity);
  }

  async findById(id: string): Promise<DoctorProfessionalData | null> {
    Logger.info('Obteniendo datos profesionales por ID', { id });

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      Logger.warning('Datos profesionales no encontrados', { id });
      return null;
    }

    Logger.success('Datos profesionales obtenidos', { id });
    return this.mapToEntity(data);
  }

  async findByDoctorId(doctorId: string): Promise<DoctorProfessionalData | null> {
    Logger.info('Obteniendo datos profesionales por ID de médico', { doctorId });

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id_doctor', doctorId)
      .single();

    if (error) {
      return null;
    }

    return this.mapToEntity(data);
  }

  async findByRethusRegistration(rethusRegistration: string): Promise<DoctorProfessionalData | null> {
    Logger.info('Obteniendo datos profesionales por registro RETHUS', { rethusRegistration });

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('rethus_registration', rethusRegistration)
      .single();

    if (error) {
      return null;
    }

    return this.mapToEntity(data);
  }

  async findByProfessionalCard(professionalCardNumber: string): Promise<DoctorProfessionalData | null> {
    Logger.info('Obteniendo datos profesionales por tarjeta profesional', { professionalCardNumber });

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('professional_card_number', professionalCardNumber)
      .single();

    if (error) {
      return null;
    }

    return this.mapToEntity(data);
  }

  async update(id: string, data: Partial<DoctorProfessionalData>): Promise<DoctorProfessionalData> {
    const now = new Date();

    Logger.info('Actualizando datos profesionales', { id });

    const updateData: any = { updated_at: now };
    if (data.professionalTitle !== undefined) updateData.professional_title = data.professionalTitle;
    if (data.university !== undefined) updateData.university = data.university;
    if (data.country !== undefined) updateData.country = data.country;
    if (data.graduationYear !== undefined) updateData.graduation_year = data.graduationYear;
    if (data.professionalCardNumber !== undefined) updateData.professional_card_number = data.professionalCardNumber;
    if (data.rethusRegistration !== undefined) updateData.rethus_registration = data.rethusRegistration;
    if (data.registrationStatus !== undefined) updateData.registration_status = data.registrationStatus;
    if (data.medicalSpecialty !== undefined) updateData.medical_specialty = data.medicalSpecialty;
    if (data.subspecialty !== undefined) updateData.subspecialty = data.subspecialty;
    if (data.additionalCertifications !== undefined) updateData.additional_certifications = data.additionalCertifications;
    if (data.diplomaUrl !== undefined) updateData.diploma_url = data.diplomaUrl;
    if (data.degreeCertificateUrl !== undefined) updateData.degree_certificate_url = data.degreeCertificateUrl;
    if (data.specialtyCertificatesUrl !== undefined) updateData.specialty_certificates_url = data.specialtyCertificatesUrl;
    if (data.isVerified !== undefined) updateData.is_verified = data.isVerified;

    const { data: result, error } = await supabase
      .from(this.table)
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      Logger.danger('Error al actualizar datos profesionales', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Datos profesionales actualizados', { id });
    return this.mapToEntity(result);
  }

  async delete(id: string): Promise<void> {
    Logger.info('Eliminando datos profesionales', { id });

    const { error } = await supabase
      .from(this.table)
      .delete()
      .eq('id', id);

    if (error) {
      Logger.danger('Error al eliminar datos profesionales', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Datos profesionales eliminados', { id });
  }

  private mapToEntity(data: any): DoctorProfessionalData {
    return {
      id: data.id,
      doctorId: data.id_doctor,
      professionalTitle: data.professional_title,
      university: data.university,
      country: data.country,
      graduationYear: data.graduation_year,
      professionalCardNumber: data.professional_card_number,
      rethusRegistration: data.rethus_registration,
      registrationStatus: data.registration_status as RegistrationStatus,
      medicalSpecialty: data.medical_specialty,
      subspecialty: data.subspecialty,
      additionalCertifications: (data.additional_certifications || []) as DoctorCertification[],
      diplomaUrl: data.diploma_url,
      degreeCertificateUrl: data.degree_certificate_url,
      specialtyCertificatesUrl: data.specialty_certificates_url || [],
      isVerified: data.is_verified,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }
}
