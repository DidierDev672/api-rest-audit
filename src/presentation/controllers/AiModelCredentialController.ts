import { Request, Response } from 'express';
import { CreateAiModelCredentialUseCase } from '../../application/use-cases/CreateAiModelCredentialUseCase';
import { GetAiModelCredentialUseCase } from '../../application/use-cases/GetAiModelCredentialUseCase';
import { UpdateAiModelCredentialUseCase } from '../../application/use-cases/UpdateAiModelCredentialUseCase';
import { DeleteAiModelCredentialUseCase } from '../../application/use-cases/DeleteAiModelCredentialUseCase';
import { TestAiModelCredentialUseCase } from '../../application/use-cases/TestAiModelCredentialUseCase';
import { AiModelCredentialRepository } from '../../infrastructure/database/AiModelCredentialRepository';
import { AiModelTesterGateway } from '../../infrastructure/clients/AiModelTesterGateway';
import {
  CreateAiModelCredentialSchema,
  UpdateAiModelCredentialSchema,
} from '../dto/AiModelCredentialDTO';
import { IdValidator } from '../../infrastructure/validators/IdValidator';
import { ValidationError } from '../../domain/errors/ValidationError';
import { AppError } from '../../infrastructure/middleware/errorHandler';
import { ZodError } from 'zod';
import { Logger } from '../../infrastructure/logger/Logger';

const repository = new AiModelCredentialRepository();
const createUseCase = new CreateAiModelCredentialUseCase(repository);
const getUseCase = new GetAiModelCredentialUseCase(repository);
const updateUseCase = new UpdateAiModelCredentialUseCase(repository);
const deleteUseCase = new DeleteAiModelCredentialUseCase(repository);
const testUseCase = new TestAiModelCredentialUseCase(repository, new AiModelTesterGateway());

export class AiModelCredentialController {
  /** POST /api/v1/ai-model-credentials/:id/test — prueba el modelo en vivo. */
  static async test(req: Request, res: Response) {
    try {
      const { id } = req.params;
      IdValidator.validate(id, 'AiModelCredential');

      const result = await testUseCase.execute(id);

      res.json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      AiModelCredentialController.handleError(error, res, 'test');
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const data = CreateAiModelCredentialSchema.parse(req.body);
      const result = await createUseCase.execute(data);

      res.status(201).json({
        status: 'success',
        message: 'Credencial de modelo IA guardada correctamente',
        data: result,
      });
    } catch (error) {
      AiModelCredentialController.handleError(error, res, 'create');
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const ownerId =
        typeof req.query.ownerId === 'string' ? req.query.ownerId.trim() : '';

      const credentials = ownerId
        ? await getUseCase.findByOwnerId(ownerId)
        : await getUseCase.findAll();

      res.json({
        status: 'success',
        data: credentials,
      });
    } catch (error) {
      AiModelCredentialController.handleError(error, res, 'findAll');
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      IdValidator.validate(id, 'AiModelCredential');

      const credential = await getUseCase.findById(id);

      res.json({
        status: 'success',
        data: credential,
      });
    } catch (error) {
      AiModelCredentialController.handleError(error, res, 'findById');
    }
  }

  static async findByOwnerId(req: Request, res: Response) {
    try {
      const { ownerId } = req.params;
      if (!ownerId || ownerId.trim() === '') {
        throw new AppError('El ownerId es requerido', 400);
      }

      const credentials = await getUseCase.findByOwnerId(ownerId.trim());

      res.json({
        status: 'success',
        data: credentials,
      });
    } catch (error) {
      AiModelCredentialController.handleError(error, res, 'findByOwnerId');
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      IdValidator.validate(id, 'AiModelCredential');

      const data = UpdateAiModelCredentialSchema.parse(req.body);
      const updated = await updateUseCase.execute(id, data);

      res.json({
        status: 'success',
        message: 'Credencial de modelo IA actualizada correctamente',
        data: updated,
      });
    } catch (error) {
      AiModelCredentialController.handleError(error, res, 'update');
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      IdValidator.validate(id, 'AiModelCredential');

      await deleteUseCase.execute(id);

      res.json({
        status: 'success',
        message: 'Credencial de modelo IA eliminada correctamente',
      });
    } catch (error) {
      AiModelCredentialController.handleError(error, res, 'delete');
    }
  }

  private static handleError(error: unknown, res: Response, action: string) {
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
    if (error instanceof ValidationError) {
      res.status(404).json({
        status: 'error',
        code: 'NOT_FOUND',
        message: error.message,
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
    Logger.danger(`Error en AiModelCredentialController.${action}`, {
      error: (error as Error).message,
    });
    res.status(500).json({
      status: 'error',
      code: 'INTERNAL_ERROR',
      message: (error as Error).message,
    });
  }
}
