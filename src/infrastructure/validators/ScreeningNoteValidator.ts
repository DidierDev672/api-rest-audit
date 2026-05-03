import { ZodError } from 'zod';
import { Logger } from '../logger/Logger';
import { IdValidator } from './IdValidator';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
  }
}

export class EntityNotFoundError extends Error {
  constructor(entityName: string, id: string) {
    super(`${entityName} con ID ${id} no encontrado`);
    this.name = 'EntityNotFoundError';
  }
}

export class ScreeningNoteValidator {
  static validateId(id: string, entityName: string): void {
    IdValidator.validate(id, entityName);
  }

  static async validatePatientExists(
    patientId: string,
    patientRepository: any
  ): Promise<boolean> {
    try {
      Logger.info(`Validando existencia de paciente`, { id: patientId });
      const patient = await patientRepository.findById(patientId);
      if (!patient) {
        Logger.warning(`Paciente no encontrado`, { id: patientId });
        return false;
      }
      Logger.success(`Paciente validado`, { id: patientId });
      return true;
    } catch (error) {
      Logger.danger(`Error al validar paciente`, { id: patientId, error: (error as Error).message });
      throw error;
    }
  }

  static async validateScreeningExists(
    screeningId: string,
    screeningRepository: any
  ): Promise<boolean> {
    try {
      Logger.info(`Validando existencia de tamizaje`, { id: screeningId });
      const screening = await screeningRepository.findById(screeningId);
      if (!screening) {
        Logger.warning(`Tamizaje no encontrado`, { id: screeningId });
        return false;
      }
      Logger.success(`Tamizaje validado`, { id: screeningId });
      return true;
    } catch (error) {
      Logger.danger(`Error al validar tamizaje`, { id: screeningId, error: (error as Error).message });
      throw error;
    }
  }

  static async validatePatientAndScreening(
    patientId: string,
    screeningId: string,
    patientRepository: any,
    screeningRepository: any
  ): Promise<{ patientExists: boolean; screeningExists: boolean }> {
    try {
      Logger.info(`Validando paciente y tamizaje`, { patientId, screeningId });
      
      const [patientExists, screeningExists] = await Promise.all([
        this.validatePatientExists(patientId, patientRepository),
        this.validateScreeningExists(screeningId, screeningRepository),
      ]);

      if (!patientExists) {
        throw new NotFoundError(`Paciente con ID ${patientId} no encontrado`);
      }

      if (!screeningExists) {
        throw new NotFoundError(`Tamizaje con ID ${screeningId} no encontrado`);
      }

      Logger.success(`Validación completada`, { patientExists, screeningExists });
      return { patientExists, screeningExists };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      Logger.danger(`Error en validación`, { error: (error as Error).message });
      throw error;
    }
  }
}
