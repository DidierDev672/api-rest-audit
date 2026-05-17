import { Request, Response } from 'express';
import { CreateResearchNoteAnalysisUseCase } from '../../application/use-cases/CreateResearchNoteAnalysisUseCase';
import { ResearchNoteAnalysisRepository } from '../../infrastructure/database/ResearchNoteAnalysisRepository';
import { AuditoryResearchRepository } from '../../infrastructure/database/AuditoryResearchRepository';
import { CreateResearchNoteAnalysisSchema } from '../dto';
import { IdValidator } from '../../infrastructure/validators/IdValidator';
import { AppError } from '../../infrastructure/middleware/errorHandler';
import { ZodError } from 'zod';
import { Logger } from '../../infrastructure/logger/Logger';

const repository = new ResearchNoteAnalysisRepository();
const auditoryResearchRepository = new AuditoryResearchRepository();

export class ResearchNoteAnalysisController {
  static async create(req: Request, res: Response) {
    try {
      const data = CreateResearchNoteAnalysisSchema.parse(req.body);
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({
          status: 'error',
          code: 'UNAUTHORIZED',
          message: 'Usuario no autenticado',
        });
        return;
      }

      const useCase = new CreateResearchNoteAnalysisUseCase(repository, auditoryResearchRepository);
      const result = await useCase.execute(data, userId);

      res.status(201).json({
        status: 'success',
        message: 'Analisis guardado correctamente',
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
      Logger.danger('Error en ResearchNoteAnalysisController.create', { error: (error as Error).message });
      res.status(500).json({
        status: 'error',
        code: 'INTERNAL_ERROR',
        message: (error as Error).message,
      });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      IdValidator.validate(id, 'Analysis');

      const analysis = await repository.findById(id);
      if (!analysis) {
        throw new AppError(`Análisis con ID ${id} no encontrado`, 404);
      }

      res.json(analysis);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }
      Logger.danger('Error en ResearchNoteAnalysisController.findById', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async findByResearchId(req: Request, res: Response) {
    try {
      const { researchId } = req.params;
      IdValidator.validate(researchId, 'Investigación');

      const research = await auditoryResearchRepository.findById(researchId);
      if (!research) {
        throw new AppError(`Investigación con ID ${researchId} no encontrada`, 404);
      }

      const analyses = await repository.findByResearchId(researchId);
      res.json(analyses);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }
      Logger.danger('Error en ResearchNoteAnalysisController.findByResearchId', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
