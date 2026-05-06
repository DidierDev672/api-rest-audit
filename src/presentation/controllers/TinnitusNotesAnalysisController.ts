import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { Logger } from '../../infrastructure/logger/Logger';
import {
  TinnitusNotesAnalysisRepository,
  PatientRepository,
  TinnitusQuestionnaireRepository,
  TinnitusResponseRepository
} from '../../infrastructure/database';
import { CreateTinnitusNotesAnalysisSchema } from '../dto';
import {
  CreateTinnitusNotesAnalysisUseCase,
  GetAllTinnitusNotesAnalysisUseCase,
  GetTinnitusNotesAnalysisByIdUseCase,
  GetTinnitusNotesAnalysisByPatientUseCase,
  GetTinnitusNotesAnalysisByQuestionnaireUseCase,
  GetTinnitusNotesAnalysisByResponseUseCase,
  UpdateTinnitusNotesAnalysisUseCase,
  DeleteTinnitusNotesAnalysisUseCase,
} from '../../domain/usecases';
import {
  NotFoundAppError,
  ValidationAppError,
} from '../../infrastructure/middleware/errorHandler';

const repository = new TinnitusNotesAnalysisRepository();
const patientRepository = new PatientRepository();
const questionnaireRepository = new TinnitusQuestionnaireRepository();
const responseRepository = new TinnitusResponseRepository();

export class TinnitusNotesAnalysisController {
  static async create(req: Request, res: Response) {
    try {
      Logger.info('TinnitusNotesAnalysisController.create - Solicitud recibida', {
        body: req.body,
      });

      const data = CreateTinnitusNotesAnalysisSchema.parse(req.body);
      const useCase = new CreateTinnitusNotesAnalysisUseCase(
        repository,
        patientRepository,
        questionnaireRepository,
        responseRepository
      );

      const result = await useCase.execute({
        idPatient: data.id_patient,
        idTinnitusQuestionnaires: data.id_tinnitus_questionnaires,
        idTinnitusResponse: data.id_tinnitus_response,
        analysis: data.analysis,
        noteCount: data.note_count,
        analyzedAt: data.analyzed_at ? new Date(data.analyzed_at) : undefined,
      });

      Logger.success('TinnitusNotesAnalysisController.create - Análisis creado', { id: result.id });
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        Logger.warning('TinnitusNotesAnalysisController.create - Error de validación Zod', {
          errors: error.errors,
        });
        throw new ValidationAppError('Datos de entrada inválidos', error.errors);
      }

      const errorMessage = (error as Error).message;
      if (errorMessage.includes('no encontrado') || errorMessage.includes('no existe')) {
        Logger.warning('TinnitusNotesAnalysisController.create - Entidad no encontrada', {
          error: errorMessage,
        });
        throw new NotFoundAppError(errorMessage);
      }

      Logger.danger('TinnitusNotesAnalysisController.create - Error interno', {
        error: errorMessage,
      });
      throw error;
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      Logger.info('TinnitusNotesAnalysisController.findAll - Solicitud recibida');

      const useCase = new GetAllTinnitusNotesAnalysisUseCase(repository);
      const result = await useCase.execute();

      Logger.success('TinnitusNotesAnalysisController.findAll - Análisis obtenidos', {
        count: result.length,
      });
      res.json(result);
    } catch (error) {
      Logger.danger('TinnitusNotesAnalysisController.findAll - Error', {
        error: (error as Error).message,
      });
      throw error;
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      Logger.info('TinnitusNotesAnalysisController.findById - Solicitud recibida', { id });

      const useCase = new GetTinnitusNotesAnalysisByIdUseCase(repository);
      const result = await useCase.execute(id);

      if (!result) {
        Logger.warning('TinnitusNotesAnalysisController.findById - Análisis no encontrado', { id });
        throw new NotFoundAppError(`Análisis de notas con ID ${id} no encontrado`);
      }

      Logger.success('TinnitusNotesAnalysisController.findById - Análisis obtenido', { id });
      res.json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        Logger.warning('TinnitusNotesAnalysisController.findById - ID inválido', { error: errorMessage });
        throw new ValidationAppError(errorMessage, []);
      }

      Logger.danger('TinnitusNotesAnalysisController.findById - Error', { error: errorMessage });
      throw error;
    }
  }

  static async findByPatient(req: Request, res: Response) {
    try {
      const { patientId } = req.params;
      Logger.info('TinnitusNotesAnalysisController.findByPatient - Solicitud recibida', { patientId });

      const useCase = new GetTinnitusNotesAnalysisByPatientUseCase(repository);
      const result = await useCase.execute(patientId);

      Logger.success('TinnitusNotesAnalysisController.findByPatient - Análisis obtenidos', {
        count: result.length,
        patientId,
      });
      res.json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        Logger.warning('TinnitusNotesAnalysisController.findByPatient - ID inválido', { error: errorMessage });
        throw new ValidationAppError(errorMessage, []);
      }

      Logger.danger('TinnitusNotesAnalysisController.findByPatient - Error', { error: errorMessage });
      throw error;
    }
  }

  static async findByQuestionnaire(req: Request, res: Response) {
    try {
      const { questionnaireId } = req.params;
      Logger.info('TinnitusNotesAnalysisController.findByQuestionnaire - Solicitud recibida', { questionnaireId });

      const useCase = new GetTinnitusNotesAnalysisByQuestionnaireUseCase(repository);
      const result = await useCase.execute(questionnaireId);

      Logger.success('TinnitusNotesAnalysisController.findByQuestionnaire - Análisis obtenidos', {
        count: result.length,
        questionnaireId,
      });
      res.json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        Logger.warning('TinnitusNotesAnalysisController.findByQuestionnaire - ID inválido', { error: errorMessage });
        throw new ValidationAppError(errorMessage, []);
      }

      Logger.danger('TinnitusNotesAnalysisController.findByQuestionnaire - Error', { error: errorMessage });
      throw error;
    }
  }

  static async findByResponse(req: Request, res: Response) {
    try {
      const { responseId } = req.params;
      Logger.info('TinnitusNotesAnalysisController.findByResponse - Solicitud recibida', { responseId });

      const useCase = new GetTinnitusNotesAnalysisByResponseUseCase(repository);
      const result = await useCase.execute(responseId);

      Logger.success('TinnitusNotesAnalysisController.findByResponse - Análisis obtenidos', {
        count: result.length,
        responseId,
      });
      res.json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        Logger.warning('TinnitusNotesAnalysisController.findByResponse - ID inválido', { error: errorMessage });
        throw new ValidationAppError(errorMessage, []);
      }

      Logger.danger('TinnitusNotesAnalysisController.findByResponse - Error', { error: errorMessage });
      throw error;
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      Logger.info('TinnitusNotesAnalysisController.update - Solicitud recibida', { id, body: req.body });

      const data = CreateTinnitusNotesAnalysisSchema.partial().parse(req.body);
      const useCase = new UpdateTinnitusNotesAnalysisUseCase(
        repository,
        patientRepository,
        questionnaireRepository,
        responseRepository
      );

      const result = await useCase.execute(id, {
        idPatient: data.id_patient,
        idTinnitusQuestionnaires: data.id_tinnitus_questionnaires,
        idTinnitusResponse: data.id_tinnitus_response,
        analysis: data.analysis,
        noteCount: data.note_count,
        analyzedAt: data.analyzed_at ? new Date(data.analyzed_at) : undefined,
      });

      Logger.success('TinnitusNotesAnalysisController.update - Análisis actualizado', { id });
      res.json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        Logger.warning('TinnitusNotesAnalysisController.update - Error de validación Zod', {
          errors: error.errors,
        });
        throw new ValidationAppError('Datos de entrada inválidos', error.errors);
      }

      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        Logger.warning('TinnitusNotesAnalysisController.update - ID inválido', { error: errorMessage });
        throw new ValidationAppError(errorMessage, []);
      }
      if (errorMessage.includes('no encontrado')) {
        Logger.warning('TinnitusNotesAnalysisController.update - Análisis no encontrado', { error: errorMessage });
        throw new NotFoundAppError(errorMessage);
      }

      Logger.danger('TinnitusNotesAnalysisController.update - Error', { error: errorMessage });
      throw error;
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      Logger.info('TinnitusNotesAnalysisController.delete - Solicitud recibida', { id });

      const useCase = new DeleteTinnitusNotesAnalysisUseCase(repository);
      await useCase.execute(id);

      Logger.success('TinnitusNotesAnalysisController.delete - Análisis eliminado', { id });
      res.status(204).send();
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        Logger.warning('TinnitusNotesAnalysisController.delete - ID inválido', { error: errorMessage });
        throw new ValidationAppError(errorMessage, []);
      }

      Logger.danger('TinnitusNotesAnalysisController.delete - Error', { error: errorMessage });
      throw error;
    }
  }
}
