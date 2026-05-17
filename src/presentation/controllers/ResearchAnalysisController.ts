import { Request, Response } from 'express';
import { CreateResearchAnalysisUseCase } from '../../application/use-cases/CreateResearchAnalysisUseCase';
import { ResearchAnalysisRepository } from '../../infrastructure/database';
import { AuditoryResearchRepository } from '../../infrastructure/database/AuditoryResearchRepository';
import { CreateResearchAnalysisSchema } from '../dto';
import { IdValidator } from '../../infrastructure/validators/IdValidator';
import { AppError } from '../../infrastructure/middleware/errorHandler';
import { ZodError } from 'zod';
import { Logger } from '../../infrastructure/logger/Logger';

const repository = new ResearchAnalysisRepository();
const auditoryResearchRepository = new AuditoryResearchRepository();

export class ResearchAnalysisController {
  static async findAll(req: Request, res: Response) {
    try {
      const analyses = await repository.findAll();
      res.json(analyses);
    } catch (error) {
      Logger.danger('Error in ResearchAnalysisController.findAll', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const data = CreateResearchAnalysisSchema.parse(req.body);
      const useCase = new CreateResearchAnalysisUseCase(repository);
      const result = await useCase.execute(data);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      Logger.danger('Error in ResearchAnalysisController.create', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      IdValidator.validate(id, 'Analysis');

      const analysis = await repository.findById(id);
      if (!analysis) {
        throw new AppError(`Analysis with ID ${id} not found`, 404);
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
      Logger.danger('Error in ResearchAnalysisController.findById', { error: (error as Error).message });
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
      Logger.danger('Error in ResearchAnalysisController.findByResearchId', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      IdValidator.validate(id, 'Analysis');

      const data = CreateResearchAnalysisSchema.partial().parse(req.body);
      const updated = await repository.update(id, data);
      res.json(updated);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }
      Logger.danger('Error in ResearchAnalysisController.update', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      IdValidator.validate(id, 'Analysis');

      await repository.delete(id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }
      Logger.danger('Error in ResearchAnalysisController.delete', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async deleteByResearchId(req: Request, res: Response) {
    try {
      const { researchId } = req.params;
      IdValidator.validate(researchId, 'Investigación');

      await repository.deleteByResearchId(researchId);
      res.status(204).send();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }
      Logger.danger('Error in ResearchAnalysisController.deleteByResearchId', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }
}