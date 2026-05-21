import { Request, Response } from 'express';
import { CreateAiDocumentAnalysisUseCase } from '../../application/use-cases/CreateAiDocumentAnalysisUseCase';
import { GetAiDocumentAnalysisUseCase } from '../../application/use-cases/GetAiDocumentAnalysisUseCase';
import { AiDocumentAnalysisRepository } from '../../infrastructure/database/AiDocumentAnalysisRepository';
import { CreateAiDocumentAnalysisSchema } from '../dto/AiDocumentAnalysisDTO';
import { IdValidator } from '../../infrastructure/validators/IdValidator';
import { AppError } from '../../infrastructure/middleware/errorHandler';
import { ZodError } from 'zod';
import { Logger } from '../../infrastructure/logger/Logger';

const repository = new AiDocumentAnalysisRepository();
const createUseCase = new CreateAiDocumentAnalysisUseCase(repository);
const getUseCase = new GetAiDocumentAnalysisUseCase(repository);

export class AiDocumentAnalysisController {
  static async create(req: Request, res: Response) {
    try {
      const data = CreateAiDocumentAnalysisSchema.parse(req.body);
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({
          status: 'error',
          code: 'UNAUTHORIZED',
          message: 'Usuario no autenticado',
        });
        return;
      }

      const result = await createUseCase.execute(data, userId);

      res.status(201).json({
        status: 'success',
        message: 'Análisis guardado correctamente',
        data: result,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const firstError = error.errors[0];
        res.status(400).json({
          status: 'error',
          code: 'VALIDATION_ERROR',
          message: firstError.message,
          details: {
            field: firstError.path.join('.'),
          },
        });
        return;
      }
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          status: 'error',
          code: 'APP_ERROR',
          message: error.message,
        });
        return;
      }
      Logger.danger('Error en AiDocumentAnalysisController.create', { error: (error as Error).message });
      res.status(500).json({
        status: 'error',
        code: 'INTERNAL_ERROR',
        message: (error as Error).message,
      });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const analyses = await getUseCase.findAll();

      res.json({
        status: 'success',
        data: analyses,
      });
    } catch (error) {
      Logger.danger('Error en AiDocumentAnalysisController.findAll', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      IdValidator.validate(id, 'AiDocumentAnalysis');

      const analysis = await getUseCase.findById(id);

      res.json({
        status: 'success',
        data: analysis,
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }
      Logger.danger('Error en AiDocumentAnalysisController.findById', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async findByDocumentUploadId(req: Request, res: Response) {
    try {
      const { documentUploadId } = req.params;
      IdValidator.validate(documentUploadId, 'DocumentUpload');

      const analyses = await getUseCase.findByDocumentUploadId(documentUploadId);

      res.json({
        status: 'success',
        data: analyses,
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }
      Logger.danger('Error en AiDocumentAnalysisController.findByDocumentUploadId', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
