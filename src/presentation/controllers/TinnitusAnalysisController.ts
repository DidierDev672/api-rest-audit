import { Request, Response } from 'express';
import {
  CreateTinnitusAnalysisUseCase,
  GetAllTinnitusAnalysisUseCase,
  GetTinnitusAnalysisByIdUseCase,
  GetTinnitusAnalysisByPatientUseCase,
  GetTinnitusAnalysisByQuestionnaireUseCase,
  GetTinnitusAnalysisByResponseUseCase,
  UpdateTinnitusAnalysisUseCase,
  DeleteTinnitusAnalysisUseCase,
} from '../../domain/usecases';
import { TinnitusAnalysisRepository, PatientRepository, TinnitusQuestionnaireRepository, TinnitusResponseRepository } from '../../infrastructure/database';
import { CreateTinnitusAnalysisSchema, UpdateTinnitusAnalysisSchema } from '../dto';
import { ZodError } from 'zod';
import { Logger } from '../../infrastructure/logger/Logger';

const repository = new TinnitusAnalysisRepository();
const patientRepository = new PatientRepository();
const questionnaireRepository = new TinnitusQuestionnaireRepository();
const responseRepository = new TinnitusResponseRepository();

export class TinnitusAnalysisController {
  static async create(req: Request, res: Response) {
    try {
      const data = CreateTinnitusAnalysisSchema.parse(req.body);
      
      const useCase = new CreateTinnitusAnalysisUseCase(
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
        model: data.model,
      });
      
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('no existe')) {
        res.status(404).json({ error: errorMessage });
        return;
      }
      if (errorMessage.includes('vacío') || errorMessage.includes('requerido')) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en TinnitusAnalysisController.create', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const useCase = new GetAllTinnitusAnalysisUseCase(repository);
      const result = await useCase.execute();
      res.json(result);
    } catch (error) {
      Logger.danger('Error en TinnitusAnalysisController.findAll', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const useCase = new GetTinnitusAnalysisByIdUseCase(repository);
      const result = await useCase.execute(id);
      
      if (!result) {
        res.status(404).json({ error: 'Análisis de tinnitus no encontrado' });
        return;
      }
      
      res.json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en TinnitusAnalysisController.findById', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async findByPatientId(req: Request, res: Response) {
    try {
      const { patientId } = req.params;
      const useCase = new GetTinnitusAnalysisByPatientUseCase(repository);
      const result = await useCase.execute(patientId);
      res.json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en TinnitusAnalysisController.findByPatientId', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async findByQuestionnaireId(req: Request, res: Response) {
    try {
      const { questionnaireId } = req.params;
      const useCase = new GetTinnitusAnalysisByQuestionnaireUseCase(repository);
      const result = await useCase.execute(questionnaireId);
      res.json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en TinnitusAnalysisController.findByQuestionnaireId', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async findByResponseId(req: Request, res: Response) {
    try {
      const { responseId } = req.params;
      const useCase = new GetTinnitusAnalysisByResponseUseCase(repository);
      const result = await useCase.execute(responseId);
      res.json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en TinnitusAnalysisController.findByResponseId', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = UpdateTinnitusAnalysisSchema.parse(req.body);
      
      const transformedData: any = {};
      if (data.id_patient !== undefined) transformedData.idPatient = data.id_patient;
      if (data.id_tinnitus_questionnaires !== undefined) transformedData.idTinnitusQuestionnaires = data.id_tinnitus_questionnaires;
      if (data.id_tinnitus_response !== undefined) transformedData.idTinnitusResponse = data.id_tinnitus_response;
      if (data.analysis !== undefined) transformedData.analysis = data.analysis;
      if (data.model !== undefined) transformedData.model = data.model;
      
      const useCase = new UpdateTinnitusAnalysisUseCase(
        repository,
        patientRepository,
        questionnaireRepository,
        responseRepository
      );
      
      const result = await useCase.execute(id, transformedData);
      res.json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      if (errorMessage.includes('no encontrado')) {
        res.status(404).json({ error: errorMessage });
        return;
      }
      if (errorMessage.includes('vacío')) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en TinnitusAnalysisController.update', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const useCase = new DeleteTinnitusAnalysisUseCase(repository);
      await useCase.execute(id);
      res.status(204).send();
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en TinnitusAnalysisController.delete', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }
}