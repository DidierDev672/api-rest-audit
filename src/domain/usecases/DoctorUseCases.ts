import { Doctor, DoctorDocumentType, Gender } from '../entities';
import { IDoctorRepository } from '../repositories';
import { Logger } from '../../infrastructure/logger/Logger';
import { DoctorValidator } from '../../infrastructure/validators/DoctorValidator';

export interface CreateDoctorData {
  documentType: DoctorDocumentType;
  documentNumber: string;
  fullName: string;
  birthDate: Date;
  gender: Gender;
  email: string;
  phone?: string;
  address?: string;
}

export class CreateDoctorUseCase {
  constructor(private readonly repository: IDoctorRepository) {}

  async execute(data: CreateDoctorData): Promise<Doctor> {
    try {
      Logger.info('Iniciando creación de médico', { fullName: data.fullName });

      const existingByDocument = await this.repository.findByDocumentNumber(data.documentNumber);
      if (existingByDocument) {
        throw new Error('Ya existe un médico con este número de documento');
      }

      const existingByEmail = await this.repository.findByEmail(data.email);
      if (existingByEmail) {
        throw new Error('Ya existe un médico con este correo electrónico');
      }

      const result = await this.repository.create({
        documentType: data.documentType,
        documentNumber: data.documentNumber,
        fullName: data.fullName,
        birthDate: data.birthDate,
        gender: data.gender,
        email: data.email,
        phone: data.phone,
        address: data.address,
        isActive: true,
      });

      Logger.success('Médico creado exitosamente', { id: result.id });
      return result;
    } catch (error) {
      Logger.danger('Error al crear médico', { error: (error as Error).message });
      throw error;
    }
  }
}

export class GetAllDoctorsUseCase {
  constructor(private readonly repository: IDoctorRepository) {}

  async execute(): Promise<Doctor[]> {
    try {
      Logger.info('Obteniendo todos los médicos');
      const result = await this.repository.findAll();
      Logger.success('Médicos obtenidos', { count: result.length });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener médicos', { error: (error as Error).message });
      throw error;
    }
  }
}

export class GetDoctorByIdUseCase {
  constructor(private readonly repository: IDoctorRepository) {}

  async execute(id: string): Promise<Doctor | null> {
    try {
      DoctorValidator.validateId(id);
      Logger.info('Obteniendo médico por ID', { id });

      const result = await this.repository.findById(id);

      if (!result) {
        Logger.warning('Médico no encontrado', { id });
        return null;
      }

      Logger.success('Médico obtenido', { id });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener médico por ID', { error: (error as Error).message });
      throw error;
    }
  }
}

export class UpdateDoctorUseCase {
  constructor(private readonly repository: IDoctorRepository) {}

  async execute(id: string, data: Partial<Doctor>): Promise<Doctor> {
    try {
      DoctorValidator.validateId(id);
      Logger.info('Actualizando médico', { id });

      const result = await this.repository.update(id, data);

      Logger.success('Médico actualizado', { id });
      return result;
    } catch (error) {
      Logger.danger('Error al actualizar médico', { error: (error as Error).message });
      throw error;
    }
  }
}

export class DeleteDoctorUseCase {
  constructor(private readonly repository: IDoctorRepository) {}

  async execute(id: string): Promise<void> {
    try {
      DoctorValidator.validateId(id);
      Logger.info('Eliminando médico', { id });

      await this.repository.delete(id);

      Logger.success('Médico eliminado', { id });
    } catch (error) {
      Logger.danger('Error al eliminar médico', { error: (error as Error).message });
      throw error;
    }
  }
}
