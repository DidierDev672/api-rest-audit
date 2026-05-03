import { Request, Response } from 'express';
import {
  CreateAssignmentUseCase,
  GetAssignmentsByPatientUseCase,
  GetAssignmentByIdUseCase,
  DeleteAssignmentUseCase,
  DeletePatientAssignmentsUseCase,
  ValidateAssignmentUseCase,
  CheckPatientExistsUseCase,
  CheckScreeningExistsUseCase,
} from '../../domain/usecases';
import {
  PatientRepository,
  ScreeningRepository,
  PatientScreeningAssignmentRepository,
} from '../../infrastructure/database';
import {
  AssignScreeningsSchema,
  ValidateAssignmentSchema,
  CheckPatientScreeningExistsSchema,
  CheckScreeningExistsSchema,
} from '../dto';
import { ZodError } from 'zod';
import { Logger } from '../../infrastructure/logger/Logger';

const patientRepository = new PatientRepository();
const screeningRepository = new ScreeningRepository();
const assignmentRepository = new PatientScreeningAssignmentRepository();

export class PatientScreeningAssignmentController {
  static async assign(req: Request, res: Response) {
    try {
      const data = AssignScreeningsSchema.parse(req.body);
      const useCase = new CreateAssignmentUseCase(
        assignmentRepository,
        patientRepository,
        screeningRepository
      );
      const result = await useCase.execute(data);
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
      Logger.danger('Error en PatientScreeningAssignmentController.assign', {
        error: errorMessage,
      });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async getByPatient(req: Request, res: Response) {
    try {
      const { patientId } = req.params;
      const schema = CheckPatientScreeningExistsSchema.parse({ patientId });
      const useCase = new GetAssignmentsByPatientUseCase(assignmentRepository);
      const result = await useCase.execute(schema.patientId);
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
      Logger.danger('Error en PatientScreeningAssignmentController.getByPatient', {
        error: errorMessage,
      });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const useCase = new GetAssignmentByIdUseCase(assignmentRepository);
      const result = await useCase.execute(id);

      if (!result) {
        res.status(404).json({ error: 'Asignación no encontrada' });
        return;
      }

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
      Logger.danger('Error en PatientScreeningAssignmentController.getById', {
        error: errorMessage,
      });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const useCase = new DeleteAssignmentUseCase(assignmentRepository);
      await useCase.execute(id);
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
      Logger.danger('Error en PatientScreeningAssignmentController.delete', {
        error: errorMessage,
      });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async deleteByPatient(req: Request, res: Response) {
    try {
      const { patientId } = req.params;
      const schema = CheckPatientScreeningExistsSchema.parse({ patientId });
      const useCase = new DeletePatientAssignmentsUseCase(assignmentRepository);
      await useCase.execute(schema.patientId);
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
      Logger.danger('Error en PatientScreeningAssignmentController.deleteByPatient', {
        error: errorMessage,
      });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async validate(req: Request, res: Response) {
    try {
      const data = ValidateAssignmentSchema.parse(req.body);
      const useCase = new ValidateAssignmentUseCase(patientRepository, screeningRepository);
      const result = await useCase.execute(data.patientId, data.screeningIds);
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
      Logger.danger('Error en PatientScreeningAssignmentController.validate', {
        error: errorMessage,
      });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async checkPatientExists(req: Request, res: Response) {
    try {
      const { patientId } = req.params;
      const schema = CheckPatientScreeningExistsSchema.parse({ patientId });
      const useCase = new CheckPatientExistsUseCase(patientRepository);
      const exists = await useCase.execute(schema.patientId);
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
      Logger.danger('Error en PatientScreeningAssignmentController.checkPatientExists', {
        error: errorMessage,
      });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async checkScreeningExists(req: Request, res: Response) {
    try {
      const { screeningId } = req.params;
      const schema = CheckScreeningExistsSchema.parse({ screeningId });
      const useCase = new CheckScreeningExistsUseCase(screeningRepository);
      const exists = await useCase.execute(schema.screeningId);
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
      Logger.danger('Error en PatientScreeningAssignmentController.checkScreeningExists', {
        error: errorMessage,
      });
      res.status(500).json({ error: errorMessage });
    }
  }
}
