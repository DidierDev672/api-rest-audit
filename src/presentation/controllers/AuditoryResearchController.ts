import { Request, Response } from 'express';
import { 
  CreateAuditoryResearchUseCase, 
  GetAllAuditoryResearchUseCase, 
  GetAuditoryResearchByIdUseCase,
  UpdateAuditoryResearchUseCase,
  DeleteAuditoryResearchUseCase
} from '../../domain/usecases';
import { AuditoryResearchRepository } from '../../infrastructure/database';
import { CreateAuditoryResearchDTO, UpdateAuditoryResearchDTO } from '../dto';
import { ZodError } from 'zod';
import { Logger } from '../../infrastructure/logger/Logger';

const repository = new AuditoryResearchRepository();

export class AuditoryResearchController {
  static async create(req: Request, res: Response) {
    try {
      const data = CreateAuditoryResearchDTO.parse(req.body);
      const useCase = new CreateAuditoryResearchUseCase(repository);
      const result = await useCase.execute(data);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      Logger.danger('Error en AuditoryResearchController.create', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const useCase = new GetAllAuditoryResearchUseCase(repository);
      const result = await useCase.execute();
      res.json(result);
    } catch (error) {
      Logger.danger('Error en AuditoryResearchController.findAll', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const useCase = new GetAuditoryResearchByIdUseCase(repository);
      const result = await useCase.execute(id);
      
      if (!result) {
        res.status(404).json({ error: 'Investigación no encontrada' });
        return;
      }
      
      res.json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en AuditoryResearchController.findById', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = UpdateAuditoryResearchDTO.parse(req.body);
      const useCase = new UpdateAuditoryResearchUseCase(repository);
      const result = await useCase.execute(id, data);
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
      Logger.danger('Error en AuditoryResearchController.update', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const useCase = new DeleteAuditoryResearchUseCase(repository);
      await useCase.execute(id);
      res.status(204).send();
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en AuditoryResearchController.delete', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }
}
