import { Request, Response } from 'express';
import { CreateResearchNoteUseCase } from '../../application/use-cases/CreateResearchNoteUseCase';
import { ResearchNoteRepository } from '../../infrastructure/database';
import { AuditoryResearchRepository } from '../../infrastructure/database/AuditoryResearchRepository';
import { CreateResearchNoteDTO } from '../dto';
import { IdValidator } from '../../infrastructure/validators/IdValidator';
import { AppError } from '../../infrastructure/middleware/errorHandler';
import { ZodError } from 'zod';
import { Logger } from '../../infrastructure/logger/Logger';

const repository = new ResearchNoteRepository();
const auditoryResearchRepository = new AuditoryResearchRepository();

export class ResearchNoteController {
  static async create(req: Request, res: Response) {
    try {
      console.log(req.body);
      const data = CreateResearchNoteDTO.parse(req.body);
      const useCase = new CreateResearchNoteUseCase(repository);
      await useCase.execute(data);
      res.status(201).json({ message: 'Nota creada' });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      Logger.danger('Error en ResearchNoteController.create', { error: (error as Error).message });
      Logger.danger('Error: ', error);
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const notes = await repository.findAll();
      res.json(notes);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }
      Logger.danger('Error en ResearchNoteController.findAll', { error: (error as Error).message });
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

      const notes = await repository.findByResearchId(researchId);
      res.json(notes);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }
      Logger.danger('Error en ResearchNoteController.findByResearchId', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async findById(req: Request, res: Response) {
    res.status(501).json({ error: 'Not implemented' });
  }

  static async update(req: Request, res: Response) {
    res.status(501).json({ error: 'Not implemented' });
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await repository.deleteByResearchId(id);
      res.status(204).send();
    } catch (error) {
      Logger.danger('Error en ResearchNoteController.delete', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
