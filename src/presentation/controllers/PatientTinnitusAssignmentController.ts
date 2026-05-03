import { Request, Response } from 'express';
import {
  CreateTinnitusAssignmentUseCase,
  GetTinnitusAssignmentsByPatientUseCase,
  GetTinnitusAssignmentByIdUseCase,
  DeleteTinnitusAssignmentUseCase,
  DeletePatientTinnitusAssignmentsUseCase,
  ValidateTinnitusAssignmentUseCase,
  CheckPatientTinnitusExistsUseCase,
  CheckTinnitusExistsUseCase,
} from '../../domain/usecases';
import {
  PatientRepository,
  TinnitusQuestionnaireRepository,
  PatientTinnitusAssignmentRepository,
} from '../../infrastructure/database';
import {
  AssignTinnitusSchema,
  ValidateTinnitusAssignmentSchema,
  CheckPatientTinnitusExistsSchema,
  CheckTinnitusExistsSchema,
} from '../dto';
import { ZodError } from 'zod';
import { Logger } from '../../infrastructure/logger/Logger';

const patientRepository = new PatientRepository();
const tinnitusRepository = new TinnitusQuestionnaireRepository();
const assignmentRepository = new PatientTinnitusAssignmentRepository();

export class PatientTinnitusAssignmentController {
  static async assign(req: Request, res: Response) {
    try {
      Logger.info('Iniciando asignación de cuestionario tinnitus', { body: req.body });
      const data = AssignTinnitusSchema.parse(req.body);
      const useCase = new CreateTinnitusAssignmentUseCase(
        assignmentRepository,
        patientRepository,
        tinnitusRepository
      );
      const result = await useCase.execute(data);
      Logger.success('Asignación creada', { id: result.id });
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      const errorMessage = (error as Error).message;
      if (
        errorMessage.includes('no existe') ||
        errorMessage.includes('ID es requerido') ||
        errorMessage.includes('no es válido')
      ) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en PatientTinnitusAssignmentController.assign', {
        error: errorMessage,
      });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async getByPatient(req: Request, res: Response) {
    try {
      const { idPatient } = req.params;
      Logger.info('Obteniendo asignaciones por paciente', { idPatient });
      const schema = CheckPatientTinnitusExistsSchema.parse({ idPatient });
      const useCase = new GetTinnitusAssignmentsByPatientUseCase(assignmentRepository);
      const result = await useCase.execute(schema.idPatient);
      Logger.success('Asignaciones obtenidas', { count: result.length });
      res.json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      const errorMessage = (error as Error).message;
      if (
        errorMessage.includes('ID es requerido') ||
        errorMessage.includes('no es válido')
      ) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en PatientTinnitusAssignmentController.getByPatient', {
        error: errorMessage,
      });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      Logger.info('Obteniendo asignación por ID', { id });
      const useCase = new GetTinnitusAssignmentByIdUseCase(assignmentRepository);
      const result = await useCase.execute(id);

      if (!result) {
        res.status(404).json({ error: 'Asignación no encontrada' });
        return;
      }

      Logger.success('Asignación obtenida', { id });
      res.json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (
        errorMessage.includes('ID es requerido') ||
        errorMessage.includes('no es válido')
      ) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en PatientTinnitusAssignmentController.getById', {
        error: errorMessage,
      });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      Logger.info('Eliminando asignación', { id });
      const useCase = new DeleteTinnitusAssignmentUseCase(assignmentRepository);
      await useCase.execute(id);
      Logger.success('Asignación eliminada', { id });
      res.status(204).send();
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (
        errorMessage.includes('ID es requerido') ||
        errorMessage.includes('no es válido')
      ) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en PatientTinnitusAssignmentController.delete', {
        error: errorMessage,
      });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async deleteByPatient(req: Request, res: Response) {
    try {
      const { idPatient } = req.params;
      Logger.info('Eliminando todas las asignaciones del paciente', { idPatient });
      const schema = CheckPatientTinnitusExistsSchema.parse({ idPatient });
      const useCase = new DeletePatientTinnitusAssignmentsUseCase(assignmentRepository);
      await useCase.execute(schema.idPatient);
      Logger.success('Asignaciones del paciente eliminadas', { idPatient });
      res.status(204).send();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      const errorMessage = (error as Error).message;
      if (
        errorMessage.includes('ID es requerido') ||
        errorMessage.includes('no es válido')
      ) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en PatientTinnitusAssignmentController.deleteByPatient', {
        error: errorMessage,
      });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async validate(req: Request, res: Response) {
    try {
      Logger.info('Validando asignación', { body: req.body });
      const data = ValidateTinnitusAssignmentSchema.parse(req.body);
      const useCase = new ValidateTinnitusAssignmentUseCase(patientRepository, tinnitusRepository);
      const result = await useCase.execute(data.idPatient, data.idTinnitusQuestionnaires);
      Logger.success('Validación completada', result);
      res.json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      const errorMessage = (error as Error).message;
      if (
        errorMessage.includes('ID es requerido') ||
        errorMessage.includes('no es válido')
      ) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en PatientTinnitusAssignmentController.validate', {
        error: errorMessage,
      });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async checkPatientExists(req: Request, res: Response) {
    try {
      const { idPatient } = req.params;
      Logger.info('Verificando existencia de paciente', { idPatient });
      const schema = CheckPatientTinnitusExistsSchema.parse({ idPatient });
      const useCase = new CheckPatientTinnitusExistsUseCase(patientRepository);
      const exists = await useCase.execute(schema.idPatient);
      Logger.success('Verificación de paciente completada', { exists });
      res.json({ exists });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      const errorMessage = (error as Error).message;
      if (
        errorMessage.includes('ID es requerido') ||
        errorMessage.includes('no es válido')
      ) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en PatientTinnitusAssignmentController.checkPatientExists', {
        error: errorMessage,
      });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async checkTinnitusExists(req: Request, res: Response) {
    try {
      const { idTinnitus } = req.params;
      Logger.info('Verificando existencia de cuestionario tinnitus', { idTinnitus });
      const schema = CheckTinnitusExistsSchema.parse({ idTinnitusQuestionnaires: idTinnitus });
      const useCase = new CheckTinnitusExistsUseCase(tinnitusRepository);
      const exists = await useCase.execute(schema.idTinnitusQuestionnaires);
      Logger.success('Verificación de cuestionario completada', { exists });
      res.json({ exists });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      const errorMessage = (error as Error).message;
      if (
        errorMessage.includes('ID es requerido') ||
        errorMessage.includes('no es válido')
      ) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en PatientTinnitusAssignmentController.checkTinnitusExists', {
        error: errorMessage,
      });
      res.status(500).json({ error: errorMessage });
    }
  }
}
