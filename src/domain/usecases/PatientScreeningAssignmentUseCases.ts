import { Logger } from '../../infrastructure/logger/Logger';
import { IdValidator } from '../../infrastructure/validators/IdValidator';
import { IPatientRepository } from '../repositories';
import { IScreeningRepository } from '../repositories';
import { IPatientScreeningAssignmentRepository } from '../repositories';
import { PatientScreeningAssignment, AssignmentValidationResult } from '../entities';

export interface AssignScreeningsData {
  patientId: string;
  screeningIds: string[];
}

export class ValidateAssignmentUseCase {
  constructor(
    private readonly patientRepository: IPatientRepository,
    private readonly screeningRepository: IScreeningRepository
  ) {}

  async execute(patientId: string, screeningIds: string[]): Promise<AssignmentValidationResult> {
    try {
      IdValidator.validate(patientId, 'Patient');
      
      Logger.info('Validando asignación de tamizajes', { patientId, screeningIds });

      const patient = await this.patientRepository.findById(patientId);
      const patientExists = patient !== null;

      const screeningResults = await Promise.all(
        screeningIds.map(async (screeningId) => {
          IdValidator.validate(screeningId, 'Screening');
          const screening = await this.screeningRepository.findById(screeningId);
          return screening !== null;
        })
      );

      const missingScreeningIds = screeningIds.filter((_, index) => !screeningResults[index]);

      const result: AssignmentValidationResult = {
        patientExists,
        screeningExists: screeningResults,
        missingScreeningIds,
      };

      Logger.success('Validación de asignación completada', { 
        patientId, 
        patientExists,
        missingCount: missingScreeningIds.length 
      });

      return result;
    } catch (error) {
      Logger.danger('Error al validar asignación', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class CheckPatientExistsUseCase {
  constructor(private readonly repository: IPatientRepository) {}

  async execute(patientId: string): Promise<boolean> {
    try {
      IdValidator.validate(patientId, 'Patient');
      Logger.info('Verificando existencia de paciente', { patientId });

      const patient = await this.repository.findById(patientId);
      const exists = patient !== null;

      Logger.success('Verificación de paciente completada', { patientId, exists });
      return exists;
    } catch (error) {
      Logger.danger('Error al verificar paciente', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class CheckScreeningExistsUseCase {
  constructor(private readonly repository: IScreeningRepository) {}

  async execute(screeningId: string): Promise<boolean> {
    try {
      IdValidator.validate(screeningId, 'Screening');
      Logger.info('Verificando existencia de tamizaje', { screeningId });

      const screening = await this.repository.findById(screeningId);
      const exists = screening !== null;

      Logger.success('Verificación de tamizaje completada', { screeningId, exists });
      return exists;
    } catch (error) {
      Logger.danger('Error al verificar tamizaje', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class CreateAssignmentUseCase {
  constructor(
    private readonly assignmentRepository: IPatientScreeningAssignmentRepository,
    private readonly patientRepository: IPatientRepository,
    private readonly screeningRepository: IScreeningRepository
  ) {}

  async execute(data: AssignScreeningsData): Promise<PatientScreeningAssignment> {
    try {
      IdValidator.validate(data.patientId, 'Patient');

      Logger.info('Creando asignación de tamizajes', { 
        patientId: data.patientId, 
        screeningCount: data.screeningIds.length 
      });

      const patient = await this.patientRepository.findById(data.patientId);
      if (!patient) {
        throw new Error('El paciente no existe');
      }

      for (const screeningId of data.screeningIds) {
        IdValidator.validate(screeningId, 'Screening');
        const screening = await this.screeningRepository.findById(screeningId);
        if (!screening) {
          throw new Error(`El tamizaje con ID ${screeningId} no existe`);
        }
      }

      const existingAssignments = await this.assignmentRepository.findByPatientId(data.patientId);
      
      if (existingAssignments.length > 0) {
        const existingScreeningIds = existingAssignments[0].screeningIds;
        const newScreeningIds = [...new Set([...existingScreeningIds, ...data.screeningIds])];
        
        const updated = await this.assignmentRepository.update(existingAssignments[0].id, {
          screeningIds: newScreeningIds,
        });

        Logger.success('Asignación actualizada exitosamente', { 
          id: updated.id, 
          screeningCount: newScreeningIds.length 
        });
        return updated;
      }

      const result = await this.assignmentRepository.create({
        patientId: data.patientId,
        screeningIds: data.screeningIds,
      });

      Logger.success('Asignación creada exitosamente', { id: result.id });
      return result;
    } catch (error) {
      Logger.danger('Error al crear asignación', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class GetAssignmentsByPatientUseCase {
  constructor(private readonly repository: IPatientScreeningAssignmentRepository) {}

  async execute(patientId: string): Promise<PatientScreeningAssignment[]> {
    try {
      IdValidator.validate(patientId, 'Patient');
      Logger.info('Obteniendo asignaciones por paciente', { patientId });

      const result = await this.repository.findByPatientId(patientId);

      Logger.success('Asignaciones obtenidas', { patientId, count: result.length });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener asignaciones', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class GetAssignmentByIdUseCase {
  constructor(private readonly repository: IPatientScreeningAssignmentRepository) {}

  async execute(id: string): Promise<PatientScreeningAssignment | null> {
    try {
      IdValidator.validate(id, 'Assignment');
      Logger.info('Obteniendo asignación por ID', { id });

      const result = await this.repository.findById(id);

      if (!result) {
        Logger.warning('Asignación no encontrada', { id });
        return null;
      }

      Logger.success('Asignación obtenida', { id });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener asignación', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class DeleteAssignmentUseCase {
  constructor(private readonly repository: IPatientScreeningAssignmentRepository) {}

  async execute(id: string): Promise<void> {
    try {
      IdValidator.validate(id, 'Assignment');
      Logger.info('Eliminando asignación', { id });

      await this.repository.delete(id);

      Logger.success('Asignación eliminada', { id });
    } catch (error) {
      Logger.danger('Error al eliminar asignación', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class DeletePatientAssignmentsUseCase {
  constructor(private readonly repository: IPatientScreeningAssignmentRepository) {}

  async execute(patientId: string): Promise<void> {
    try {
      IdValidator.validate(patientId, 'Patient');
      Logger.info('Eliminando todas las asignaciones del paciente', { patientId });

      await this.repository.deleteByPatientId(patientId);

      Logger.success('Asignaciones del paciente eliminadas', { patientId });
    } catch (error) {
      Logger.danger('Error al eliminar asignaciones del paciente', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}
