import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { Logger } from '../../infrastructure/logger/Logger';
import { ScreeningNoteRepository } from '../../infrastructure/database';
import { PatientRepository, ScreeningRepository } from '../../infrastructure/database';
import { CreateScreeningNoteSchema, UpdateScreeningNoteSchema } from '../dto';
import {
  CreateScreeningNoteUseCase,
  GetAllScreeningNotesUseCase,
  GetScreeningNoteByIdUseCase,
  GetScreeningNotesByPatientUseCase,
  GetScreeningNotesByScreeningUseCase,
  UpdateScreeningNoteUseCase,
  DeleteScreeningNoteUseCase,
} from '../../domain/usecases';
import {
  NotFoundAppError,
  ValidationAppError,
} from '../../infrastructure/middleware/errorHandler';

const noteRepository = new ScreeningNoteRepository();
const patientRepository = new PatientRepository();
const screeningRepository = new ScreeningRepository();

export class ScreeningNoteController {
  static async create(req: Request, res: Response) {
    try {
      Logger.info('ScreeningNoteController.create - Solicitud recibida', {
        body: req.body,
      });

      const data = CreateScreeningNoteSchema.parse(req.body);
      const useCase = new CreateScreeningNoteUseCase(
        noteRepository,
        patientRepository,
        screeningRepository
      );

      const result = await useCase.execute({
        idPatient: data.id_patient,
        idScreening: data.id_screening,
        idDoctor: data.id_doctor,
        titleNote: data.title_note,
        descriptionNote: data.description_note,
      });

      Logger.success('ScreeningNoteController.create - Nota creada', { id: result.id });
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        Logger.warning('ScreeningNoteController.create - Error de validación Zod', {
          errors: error.errors,
        });
        throw new ValidationAppError('Datos de entrada inválidos', error.errors);
      }

      const errorMessage = (error as Error).message;
      if (errorMessage.includes('no encontrado')) {
        Logger.warning('ScreeningNoteController.create - Entidad no encontrada', {
          error: errorMessage,
        });
        throw new NotFoundAppError(errorMessage);
      }

      Logger.danger('ScreeningNoteController.create - Error interno', {
        error: errorMessage,
      });
      throw error;
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      Logger.info('ScreeningNoteController.findAll - Solicitud recibida');

      const useCase = new GetAllScreeningNotesUseCase(noteRepository);
      const result = await useCase.execute();

      Logger.success('ScreeningNoteController.findAll - Notas obtenidas', {
        count: result.length,
      });
      res.json(result);
    } catch (error) {
      Logger.danger('ScreeningNoteController.findAll - Error', {
        error: (error as Error).message,
      });
      throw error;
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      Logger.info('ScreeningNoteController.findById - Solicitud recibida', { id });

      const useCase = new GetScreeningNoteByIdUseCase(noteRepository);
      const result = await useCase.execute(id);

      if (!result) {
        Logger.warning('ScreeningNoteController.findById - Nota no encontrada', { id });
        throw new NotFoundAppError(`Nota de tamizaje con ID ${id} no encontrada`);
      }

      Logger.success('ScreeningNoteController.findById - Nota obtenida', { id });
      res.json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        Logger.warning('ScreeningNoteController.findById - ID inválido', { error: errorMessage });
        throw new ValidationAppError(errorMessage, []);
      }

      Logger.danger('ScreeningNoteController.findById - Error', { error: errorMessage });
      throw error;
    }
  }

  static async findByPatient(req: Request, res: Response) {
    try {
      const { patientId } = req.params;
      Logger.info('ScreeningNoteController.findByPatient - Solicitud recibida', { patientId });

      const useCase = new GetScreeningNotesByPatientUseCase(noteRepository);
      const result = await useCase.execute(patientId);

      Logger.success('ScreeningNoteController.findByPatient - Notas obtenidas', {
        count: result.length,
        patientId,
      });
      res.json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        Logger.warning('ScreeningNoteController.findByPatient - ID inválido', { error: errorMessage });
        throw new ValidationAppError(errorMessage, []);
      }

      Logger.danger('ScreeningNoteController.findByPatient - Error', { error: errorMessage });
      throw error;
    }
  }

  static async findByScreening(req: Request, res: Response) {
    try {
      const { screeningId } = req.params;
      Logger.info('ScreeningNoteController.findByScreening - Solicitud recibida', { screeningId });

      const useCase = new GetScreeningNotesByScreeningUseCase(noteRepository);
      const result = await useCase.execute(screeningId);

      Logger.success('ScreeningNoteController.findByScreening - Notas obtenidas', {
        count: result.length,
        screeningId,
      });
      res.json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        Logger.warning('ScreeningNoteController.findByScreening - ID inválido', { error: errorMessage });
        throw new ValidationAppError(errorMessage, []);
      }

      Logger.danger('ScreeningNoteController.findByScreening - Error', { error: errorMessage });
      throw error;
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      Logger.info('ScreeningNoteController.update - Solicitud recibida', { id, body: req.body });

      const data = UpdateScreeningNoteSchema.parse(req.body);
      const useCase = new UpdateScreeningNoteUseCase(
        noteRepository,
        patientRepository,
        screeningRepository
      );

      const result = await useCase.execute(id, {
        idPatient: data.id_patient,
        idScreening: data.id_screening,
        idDoctor: data.id_doctor,
        titleNote: data.title_note,
        descriptionNote: data.description_note,
      });

      Logger.success('ScreeningNoteController.update - Nota actualizada', { id });
      res.json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        Logger.warning('ScreeningNoteController.update - Error de validación Zod', {
          errors: error.errors,
        });
        throw new ValidationAppError('Datos de entrada inválidos', error.errors);
      }

      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        Logger.warning('ScreeningNoteController.update - ID inválido', { error: errorMessage });
        throw new ValidationAppError(errorMessage, []);
      }
      if (errorMessage.includes('no encontrado')) {
        Logger.warning('ScreeningNoteController.update - Nota no encontrada', { error: errorMessage });
        throw new NotFoundAppError(errorMessage);
      }

      Logger.danger('ScreeningNoteController.update - Error', { error: errorMessage });
      throw error;
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      Logger.info('ScreeningNoteController.delete - Solicitud recibida', { id });

      const useCase = new DeleteScreeningNoteUseCase(noteRepository);
      await useCase.execute(id);

      Logger.success('ScreeningNoteController.delete - Nota eliminada', { id });
      res.status(204).send();
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        Logger.warning('ScreeningNoteController.delete - ID inválido', { error: errorMessage });
        throw new ValidationAppError(errorMessage, []);
      }

      Logger.danger('ScreeningNoteController.delete - Error', { error: errorMessage });
      throw error;
    }
  }
}
