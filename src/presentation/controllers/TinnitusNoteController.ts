import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { Logger } from '../../infrastructure/logger/Logger';
import { TinnitusNoteRepository, PatientRepository, TinnitusQuestionnaireRepository, TinnitusResponseRepository } from '../../infrastructure/database';
import { CreateTinnitusNoteSchema, UpdateTinnitusNoteSchema } from '../dto';
import {
  CreateTinnitusNoteUseCase,
  GetAllTinnitusNotesUseCase,
  GetTinnitusNoteByIdUseCase,
  GetTinnitusNotesByPatientUseCase,
  GetTinnitusNotesByQuestionnaireUseCase,
  GetTinnitusNotesByResponseUseCase,
  UpdateTinnitusNoteUseCase,
  DeleteTinnitusNoteUseCase,
} from '../../domain/usecases';
import {
  NotFoundAppError,
  ValidationAppError,
} from '../../infrastructure/middleware/errorHandler';

const noteRepository = new TinnitusNoteRepository();
const patientRepository = new PatientRepository();
const questionnaireRepository = new TinnitusQuestionnaireRepository();
const responseRepository = new TinnitusResponseRepository();

export class TinnitusNoteController {
  static async create(req: Request, res: Response) {
    try {
      Logger.info('TinnitusNoteController.create - Solicitud recibida', {
        body: req.body,
      });

      const data = CreateTinnitusNoteSchema.parse(req.body);
      const useCase = new CreateTinnitusNoteUseCase(
        noteRepository,
        patientRepository,
        questionnaireRepository,
        responseRepository
      );

      const result = await useCase.execute({
        idPatient: data.id_patient,
        idTinnitusQuestionnaires: data.id_tinnitus_questionnaires,
        idTinnitusResponse: data.id_tinnitus_response,
        description: data.description,
      });

      Logger.success('TinnitusNoteController.create - Nota creada', { id: result.id });
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        Logger.warning('TinnitusNoteController.create - Error de validación Zod', {
          errors: error.errors,
        });
        throw new ValidationAppError('Datos de entrada inválidos', error.errors);
      }

      const errorMessage = (error as Error).message;
      if (errorMessage.includes('no encontrado') || errorMessage.includes('no existe')) {
        Logger.warning('TinnitusNoteController.create - Entidad no encontrada', {
          error: errorMessage,
        });
        throw new NotFoundAppError(errorMessage);
      }

      Logger.danger('TinnitusNoteController.create - Error interno', {
        error: errorMessage,
      });
      throw error;
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      Logger.info('TinnitusNoteController.findAll - Solicitud recibida');

      const useCase = new GetAllTinnitusNotesUseCase(noteRepository);
      const result = await useCase.execute();

      Logger.success('TinnitusNoteController.findAll - Notas obtenidas', {
        count: result.length,
      });
      res.json(result);
    } catch (error) {
      Logger.danger('TinnitusNoteController.findAll - Error', {
        error: (error as Error).message,
      });
      throw error;
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      Logger.info('TinnitusNoteController.findById - Solicitud recibida', { id });

      const useCase = new GetTinnitusNoteByIdUseCase(noteRepository);
      const result = await useCase.execute(id);

      if (!result) {
        Logger.warning('TinnitusNoteController.findById - Nota no encontrada', { id });
        throw new NotFoundAppError(`Nota de tinnitus con ID ${id} no encontrada`);
      }

      Logger.success('TinnitusNoteController.findById - Nota obtenida', { id });
      res.json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        Logger.warning('TinnitusNoteController.findById - ID inválido', { error: errorMessage });
        throw new ValidationAppError(errorMessage, []);
      }

      Logger.danger('TinnitusNoteController.findById - Error', { error: errorMessage });
      throw error;
    }
  }

  static async findByPatient(req: Request, res: Response) {
    try {
      const { patientId } = req.params;
      Logger.info('TinnitusNoteController.findByPatient - Solicitud recibida', { patientId });

      const useCase = new GetTinnitusNotesByPatientUseCase(noteRepository);
      const result = await useCase.execute(patientId);

      Logger.success('TinnitusNoteController.findByPatient - Notas obtenidas', {
        count: result.length,
        patientId,
      });
      res.json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        Logger.warning('TinnitusNoteController.findByPatient - ID inválido', { error: errorMessage });
        throw new ValidationAppError(errorMessage, []);
      }

      Logger.danger('TinnitusNoteController.findByPatient - Error', { error: errorMessage });
      throw error;
    }
  }

  static async findByQuestionnaire(req: Request, res: Response) {
    try {
      const { questionnaireId } = req.params;
      Logger.info('TinnitusNoteController.findByQuestionnaire - Solicitud recibida', { questionnaireId });

      const useCase = new GetTinnitusNotesByQuestionnaireUseCase(noteRepository);
      const result = await useCase.execute(questionnaireId);

      Logger.success('TinnitusNoteController.findByQuestionnaire - Notas obtenidas', {
        count: result.length,
        questionnaireId,
      });
      res.json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        Logger.warning('TinnitusNoteController.findByQuestionnaire - ID inválido', { error: errorMessage });
        throw new ValidationAppError(errorMessage, []);
      }

      Logger.danger('TinnitusNoteController.findByQuestionnaire - Error', { error: errorMessage });
      throw error;
    }
  }

  static async findByResponse(req: Request, res: Response) {
    try {
      const { responseId } = req.params;
      Logger.info('TinnitusNoteController.findByResponse - Solicitud recibida', { responseId });

      const useCase = new GetTinnitusNotesByResponseUseCase(noteRepository);
      const result = await useCase.execute(responseId);

      Logger.success('TinnitusNoteController.findByResponse - Notas obtenidas', {
        count: result.length,
        responseId,
      });
      res.json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        Logger.warning('TinnitusNoteController.findByResponse - ID inválido', { error: errorMessage });
        throw new ValidationAppError(errorMessage, []);
      }

      Logger.danger('TinnitusNoteController.findByResponse - Error', { error: errorMessage });
      throw error;
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      Logger.info('TinnitusNoteController.update - Solicitud recibida', { id, body: req.body });

      const data = UpdateTinnitusNoteSchema.parse(req.body);
      const useCase = new UpdateTinnitusNoteUseCase(
        noteRepository,
        patientRepository,
        questionnaireRepository,
        responseRepository
      );

      const result = await useCase.execute(id, {
        idPatient: data.id_patient,
        idTinnitusQuestionnaires: data.id_tinnitus_questionnaires,
        idTinnitusResponse: data.id_tinnitus_response,
        description: data.description,
      });

      Logger.success('TinnitusNoteController.update - Nota actualizada', { id });
      res.json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        Logger.warning('TinnitusNoteController.update - Error de validación Zod', {
          errors: error.errors,
        });
        throw new ValidationAppError('Datos de entrada inválidos', error.errors);
      }

      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        Logger.warning('TinnitusNoteController.update - ID inválido', { error: errorMessage });
        throw new ValidationAppError(errorMessage, []);
      }
      if (errorMessage.includes('no encontrado')) {
        Logger.warning('TinnitusNoteController.update - Nota no encontrada', { error: errorMessage });
        throw new NotFoundAppError(errorMessage);
      }

      Logger.danger('TinnitusNoteController.update - Error', { error: errorMessage });
      throw error;
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      Logger.info('TinnitusNoteController.delete - Solicitud recibida', { id });

      const useCase = new DeleteTinnitusNoteUseCase(noteRepository);
      await useCase.execute(id);

      Logger.success('TinnitusNoteController.delete - Nota eliminada', { id });
      res.status(204).send();
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        Logger.warning('TinnitusNoteController.delete - ID inválido', { error: errorMessage });
        throw new ValidationAppError(errorMessage, []);
      }

      Logger.danger('TinnitusNoteController.delete - Error', { error: errorMessage });
      throw error;
    }
  }
}