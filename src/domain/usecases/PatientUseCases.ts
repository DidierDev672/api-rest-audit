import { Patient, ParentInfo, PatientFamilyData } from '../entities';
import { IPatientRepository } from '../repositories';
import { Logger } from '../../infrastructure/logger/Logger';
import { IdValidator } from '../../infrastructure/validators/IdValidator';
import { AppError } from '../../infrastructure/middleware/errorHandler';

export interface CreatePatientData {
  fullName: string;
  documentType: Patient['documentType'];
  documentNumber: string;
  birthDate: Date;
  height: number;
  weight: number;
  isAllergic: boolean;
  familyData: PatientFamilyData;
  hasConsent: boolean;
}

export class CreatePatientUseCase {
  constructor(private readonly repository: IPatientRepository) {}

  async execute(data: CreatePatientData): Promise<Patient> {
    try {
      Logger.info('Creando paciente', { fullName: data.fullName });

      if (!data.hasConsent) {
        throw new AppError('El consentimiento es mandatorio para la permanencia de la integridad digital', 403);
      }

      const existingPatient = await this.repository.findByDocumentNumber(data.documentNumber);
      if (existingPatient) {
        throw new AppError('Ya existe un paciente con este número de documento', 409);
      }

      const result = await this.repository.create(data);

      Logger.success('Paciente creado exitosamente', { id: result.id });
      return result;
    } catch (error) {
      if (error instanceof AppError) throw error;
      Logger.danger('Error al crear paciente', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class GetAllPatientsUseCase {
  constructor(private readonly repository: IPatientRepository) {}

  async execute(): Promise<Patient[]> {
    try {
      Logger.info('Obteniendo todos los pacientes');

      const result = await this.repository.findAll();

      Logger.success('Pacientes obtenidos', { count: result.length });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener pacientes', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class GetPatientByIdUseCase {
  constructor(private readonly repository: IPatientRepository) {}

  async execute(id: string): Promise<Patient | null> {
    try {
      IdValidator.validate(id, 'Patient');
      Logger.info('Obteniendo paciente por ID', { id });

      const result = await this.repository.findById(id);

      if (!result) {
        Logger.warning('Paciente no encontrado', { id });
        return null;
      }

      Logger.success('Paciente obtenido', { id });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener paciente por ID', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class UpdatePatientUseCase {
  constructor(private readonly repository: IPatientRepository) {}

  async execute(id: string, data: Partial<Patient>): Promise<Patient> {
    try {
      IdValidator.validate(id, 'Patient');
      Logger.info('Actualizando paciente', { id });

      const result = await this.repository.update(id, data);

      Logger.success('Paciente actualizado', { id });
      return result;
    } catch (error) {
      Logger.danger('Error al actualizar paciente', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class DeletePatientUseCase {
  constructor(private readonly repository: IPatientRepository) {}

  async execute(id: string): Promise<void> {
    try {
      IdValidator.validate(id, 'Patient');
      Logger.info('Eliminando paciente', { id });

      await this.repository.delete(id);

      Logger.success('Paciente eliminado', { id });
    } catch (error) {
      Logger.danger('Error al eliminar paciente', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}
