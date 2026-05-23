import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { CreateAiDocumentUploadUseCase } from '../../application/use-cases/CreateAiDocumentUploadUseCase';
import { GetAiDocumentUploadUseCase } from '../../application/use-cases/GetAiDocumentUploadUseCase';
import { QueueAiDocumentAnalysisUseCase } from '../../application/use-cases/QueueAiDocumentAnalysisUseCase';
import { AiDocumentUploadRepository } from '../../infrastructure/database/AiDocumentUploadRepository';
import { PatientRepository } from '../../infrastructure/database/PatientRepository';
import { CreateAiDocumentUploadFieldsSchema } from '../dto/AiDocumentUploadDTO';
import { IdValidator } from '../../infrastructure/validators/IdValidator';
import { AppError } from '../../infrastructure/middleware/errorHandler';
import { Logger } from '../../infrastructure/logger/Logger';

const uploadRepository = new AiDocumentUploadRepository();
const patientRepository = new PatientRepository();
const createUseCase = new CreateAiDocumentUploadUseCase(
  uploadRepository,
  patientRepository,
);
const getUseCase = new GetAiDocumentUploadUseCase(uploadRepository);
const queueUseCase = new QueueAiDocumentAnalysisUseCase(uploadRepository);

export class AiDocumentUploadController {
  static async create(req: Request, res: Response) {
    try {
      if (!req.file) {
        res.status(400).json({
          status: 'error',
          code: 'VALIDATION_ERROR',
          message: 'El archivo es requerido (campo file)',
        });
        return;
      }

      const fields = CreateAiDocumentUploadFieldsSchema.parse(req.body);
      const userId = req.user?.id ?? null;
      const result = await createUseCase.execute(req.file, fields, userId);

      res.status(201).json({
        status: 'success',
        message: 'Documento almacenado correctamente',
        data: result,
      });
    } catch (error) {
      AiDocumentUploadController.handleError(error, res, 'create');
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const data = await getUseCase.findAll();
      res.json({ status: 'success', data });
    } catch (error) {
      AiDocumentUploadController.handleError(error, res, 'findAll');
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      IdValidator.validate(id, 'AiDocumentUpload');
      const data = await getUseCase.findById(id);
      res.json({ status: 'success', data });
    } catch (error) {
      AiDocumentUploadController.handleError(error, res, 'findById');
    }
  }

  static async queueAnalysis(req: Request, res: Response) {
    try {
      const { id } = req.params;
      IdValidator.validate(id, 'AiDocumentUpload');
      const data = await queueUseCase.execute(id);
      res.status(201).json({
        status: 'success',
        message: 'Análisis encolado',
        data,
      });
    } catch (error) {
      AiDocumentUploadController.handleError(error, res, 'queueAnalysis');
    }
  }

  private static handleError(error: unknown, res: Response, action: string) {
    if (error instanceof ZodError) {
      const first = error.errors[0];
      res.status(400).json({
        status: 'error',
        code: 'VALIDATION_ERROR',
        message: first.message,
        details: { field: first.path.join('.') },
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
    Logger.danger(`Error en AiDocumentUploadController.${action}`, {
      error: (error as Error).message,
    });
    res.status(500).json({
      status: 'error',
      code: 'INTERNAL_ERROR',
      message: (error as Error).message,
    });
  }
}
