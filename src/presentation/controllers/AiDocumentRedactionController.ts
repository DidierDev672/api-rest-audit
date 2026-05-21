import { Request, Response } from 'express';
import { CreateAiDocumentRedactionUseCase } from '../../application/use-cases/CreateAiDocumentRedactionUseCase';
import { GetAiDocumentRedactionUseCase } from '../../application/use-cases/GetAiDocumentRedactionUseCase';
import { UpdateAiDocumentRedactionUseCase } from '../../application/use-cases/UpdateAiDocumentRedactionUseCase';
import { DeleteAiDocumentRedactionUseCase } from '../../application/use-cases/DeleteAiDocumentRedactionUseCase';
import { AiDocumentRedactionRepository } from '../../infrastructure/database/AiDocumentRedactionRepository';
import { CreateAiDocumentRedactionSchema, UpdateAiDocumentRedactionSchema } from '../dto/AiDocumentRedactionDTO';
import { IdValidator } from '../../infrastructure/validators/IdValidator';
import { AppError } from '../../infrastructure/middleware/errorHandler';
import { ZodError } from 'zod';
import { Logger } from '../../infrastructure/logger/Logger';

const repository = new AiDocumentRedactionRepository();
const createUseCase = new CreateAiDocumentRedactionUseCase(repository);
const getUseCase = new GetAiDocumentRedactionUseCase(repository);
const updateUseCase = new UpdateAiDocumentRedactionUseCase(repository);
const deleteUseCase = new DeleteAiDocumentRedactionUseCase(repository);

export class AiDocumentRedactionController {
  static async create(req: Request, res: Response) {
    try {
      const data = CreateAiDocumentRedactionSchema.parse(req.body);
      const result = await createUseCase.execute(data);

      res.status(201).json({
        status: 'success',
        message: 'Redacción guardada correctamente',
        data: result,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const firstError = error.errors[0];
        res.status(400).json({
          status: 'error',
          code: 'VALIDATION_ERROR',
          message: firstError.message,
          details: { field: firstError.path.join('.') },
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
      Logger.danger('Error en AiDocumentRedactionController.create', { error: (error as Error).message });
      res.status(500).json({
        status: 'error',
        code: 'INTERNAL_ERROR',
        message: (error as Error).message,
      });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const redactions = await getUseCase.findAll();

      res.json({
        status: 'success',
        data: redactions,
      });
    } catch (error) {
      Logger.danger('Error en AiDocumentRedactionController.findAll', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      IdValidator.validate(id, 'AiDocumentRedaction');

      const redaction = await getUseCase.findById(id);

      res.json({
        status: 'success',
        data: redaction,
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }
      Logger.danger('Error en AiDocumentRedactionController.findById', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async findByDocumentUploadId(req: Request, res: Response) {
    try {
      const { documentUploadId } = req.params;
      IdValidator.validate(documentUploadId, 'DocumentUpload');

      const redactions = await getUseCase.findByDocumentUploadId(documentUploadId);

      res.json({
        status: 'success',
        data: redactions,
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }
      Logger.danger('Error en AiDocumentRedactionController.findByDocumentUploadId', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      IdValidator.validate(id, 'AiDocumentRedaction');

      const data = UpdateAiDocumentRedactionSchema.parse(req.body);

      const updated = await updateUseCase.execute(id, data);

      res.json({
        status: 'success',
        message: 'Redacción actualizada correctamente',
        data: updated,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const firstError = error.errors[0];
        res.status(400).json({
          status: 'error',
          code: 'VALIDATION_ERROR',
          message: firstError.message,
          details: { field: firstError.path.join('.') },
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
      Logger.danger('Error en AiDocumentRedactionController.update', { error: (error as Error).message });
      res.status(500).json({
        status: 'error',
        code: 'INTERNAL_ERROR',
        message: (error as Error).message,
      });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      IdValidator.validate(id, 'AiDocumentRedaction');

      await deleteUseCase.execute(id);

      res.json({
        status: 'success',
        message: 'Redacción eliminada correctamente',
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          status: 'error',
          code: 'APP_ERROR',
          message: error.message,
        });
        return;
      }
      Logger.danger('Error en AiDocumentRedactionController.delete', { error: (error as Error).message });
      res.status(500).json({
        status: 'error',
        code: 'INTERNAL_ERROR',
        message: (error as Error).message,
      });
    }
  }
}
