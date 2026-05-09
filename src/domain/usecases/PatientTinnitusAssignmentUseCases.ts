import { Logger } from '../../infrastructure/logger/Logger';
import { IdValidator } from '../../infrastructure/validators/IdValidator';
import { IPatientRepository } from '../repositories';
import { ITinnitusQuestionnaireRepository } from '../repositories';
import { IPatientTinnitusAssignmentRepository } from '../repositories';
import { PatientTinnitusAssignment, TinnitusAssignmentValidationResult } from '../entities';
import { TinnitusAssignmentStatus } from '../enums/TinnitusAssignmentStatus';

export interface AssignTinnitusData {
  idPatient: string;
  idTinnitusQuestionnaires: string;
}

export class ValidateTinnitusAssignmentUseCase {
  constructor(
    private readonly patientRepository: IPatientRepository,
    private readonly tinnitusRepository: ITinnitusQuestionnaireRepository
  ) {}

  async execute(idPatient: string, idTinnitusQuestionnaires: string): Promise<TinnitusAssignmentValidationResult> {
    try {
      IdValidator.validate(idPatient, 'Patient');
      IdValidator.validate(idTinnitusQuestionnaires, 'Tinnitus');

      Logger.info('Validando asignación de cuestionario tinnitus', { idPatient, idTinnitusQuestionnaires });

      const patient = await this.patientRepository.findById(idPatient);
      const patientExists = patient !== null;

      const tinnitus = await this.tinnitusRepository.findById(idTinnitusQuestionnaires);
      const tinnitusExists = tinnitus !== null;

      const result: TinnitusAssignmentValidationResult = {
        patientExists,
        tinnitusExists,
        patientMissing: !patientExists,
        tinnitusMissing: !tinnitusExists,
      };

      Logger.success('Validación de asignación completada', { 
        idPatient, 
        idTinnitusQuestionnaires,
        patientExists,
        tinnitusExists,
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

export class CheckPatientTinnitusExistsUseCase {
  constructor(private readonly repository: IPatientRepository) {}

  async execute(idPatient: string): Promise<boolean> {
    try {
      IdValidator.validate(idPatient, 'Patient');
      Logger.info('Verificando existencia de paciente', { idPatient });

      const patient = await this.repository.findById(idPatient);
      const exists = patient !== null;

      Logger.success('Verificación de paciente completada', { idPatient, exists });
      return exists;
    } catch (error) {
      Logger.danger('Error al verificar paciente', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class CheckTinnitusExistsUseCase {
  constructor(private readonly repository: ITinnitusQuestionnaireRepository) {}

  async execute(idTinnitusQuestionnaires: string): Promise<boolean> {
    try {
      IdValidator.validate(idTinnitusQuestionnaires, 'Tinnitus');
      Logger.info('Verificando existencia de cuestionario tinnitus', { idTinnitusQuestionnaires });

      const tinnitus = await this.repository.findById(idTinnitusQuestionnaires);
      const exists = tinnitus !== null;

      Logger.success('Verificación de cuestionario tinnitus completada', { idTinnitusQuestionnaires, exists });
      return exists;
    } catch (error) {
      Logger.danger('Error al verificar cuestionario tinnitus', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class CreateTinnitusAssignmentUseCase {
  constructor(
    private readonly assignmentRepository: IPatientTinnitusAssignmentRepository,
    private readonly patientRepository: IPatientRepository,
    private readonly tinnitusRepository: ITinnitusQuestionnaireRepository
  ) {}

  async execute(data: AssignTinnitusData): Promise<PatientTinnitusAssignment> {
    try {
      IdValidator.validate(data.idPatient, 'Patient');
      IdValidator.validate(data.idTinnitusQuestionnaires, 'Tinnitus');

      Logger.info('Creando asignación de cuestionario tinnitus', { 
        idPatient: data.idPatient, 
        idTinnitusQuestionnaires: data.idTinnitusQuestionnaires,
      });

      const patient = await this.patientRepository.findById(data.idPatient);
      if (!patient) {
        throw new Error('El paciente no existe');
      }

      const tinnitus = await this.tinnitusRepository.findById(data.idTinnitusQuestionnaires);
      if (!tinnitus) {
        throw new Error('El cuestionario de tinnitus no existe');
      }

      const result = await this.assignmentRepository.create({
        idPatient: data.idPatient,
        idTinnitusQuestionnaires: data.idTinnitusQuestionnaires,
        status: TinnitusAssignmentStatus.ACTIVE,
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

export class GetTinnitusAssignmentsByPatientUseCase {
  constructor(private readonly repository: IPatientTinnitusAssignmentRepository) {}

  async execute(idPatient: string): Promise<PatientTinnitusAssignment[]> {
    try {
      IdValidator.validate(idPatient, 'Patients');
      Logger.info('Obteniendo asignaciones de tinnitus por paciente', { idPatient });

      const result = await this.repository.findByPatientId(idPatient);

      if(result === null){
        Logger.warning('No se encontraron asignaciones para el paciente', { idPatient });
        return [];
      }

      

      Logger.success('Asignaciones obtenidas', { idPatient, count: result.length });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener asignaciones', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class GetTinnitusAssignmentByIdUseCase {
  constructor(private readonly repository: IPatientTinnitusAssignmentRepository) {}

  async execute(id: string): Promise<PatientTinnitusAssignment | null> {
    try {
      IdValidator.validate(id, 'TinnitusAssignment');
      Logger.info('Obteniendo asignación de tinnitus por ID', { id });

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

export class DeleteTinnitusAssignmentUseCase {
  constructor(private readonly repository: IPatientTinnitusAssignmentRepository) {}

  async execute(id: string): Promise<void> {
    try {
      IdValidator.validate(id, 'TinnitusAssignment');
      Logger.info('Eliminando asignación de tinnitus', { id });

      await this.repository.delete(id);

      Logger.success('Asignación de tinnitus eliminada', { id });
    } catch (error) {
      Logger.danger('Error al eliminar asignación', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class DeletePatientTinnitusAssignmentsUseCase {
  constructor(private readonly repository: IPatientTinnitusAssignmentRepository) {}

  async execute(idPatient: string): Promise<void> {
    try {
      IdValidator.validate(idPatient, 'Patient');
      Logger.info('Eliminando todas las asignaciones de tinnitus del paciente', { idPatient });

      await this.repository.deleteByPatientId(idPatient);

      Logger.success('Asignaciones del paciente eliminadas', { idPatient });
    } catch (error) {
      Logger.danger('Error al eliminar asignaciones del paciente', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class UpdateTinnitusAssignmentUseCase {
  constructor(
    private readonly assignmentRepository: IPatientTinnitusAssignmentRepository,
    private readonly patientRepository: IPatientRepository,
    private readonly tinnitusRepository: ITinnitusQuestionnaireRepository
  ) {}

  async execute(id: string, newStatus: TinnitusAssignmentStatus): Promise<PatientTinnitusAssignment> {
    try {
      IdValidator.validate(id, 'TinnitusAssignment');

      Logger.info('Actualizando estado de asignación de tinnitus', { id, newStatus });

      const assignment = await this.assignmentRepository.findById(id);
      if (!assignment) {
        throw new Error('La asignación de tinnitus no existe');
      }

      const currentStatus = assignment.status as TinnitusAssignmentStatus;
      if (currentStatus === TinnitusAssignmentStatus.INACTIVE || currentStatus === TinnitusAssignmentStatus.DISCONTINUED) {
        throw new Error(`No se puede actualizar: la asignación ya se encuentra ${currentStatus}`);
      }

      const result = await this.assignmentRepository.update(id, { status: newStatus });

      Logger.success('Estado de asignación actualizado exitosamente', { id, status: newStatus });
      return result;
    } catch (error) {
      Logger.danger('Error al actualizar estado de asignación', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}
