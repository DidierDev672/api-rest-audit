import { Request, Response } from 'express';
import { 
  CreateRelaxingSoundUseCase, 
  GetAllRelaxingSoundsUseCase, 
  GetRelaxingSoundByIdUseCase,
  UpdateRelaxingSoundUseCase,
  DeleteRelaxingSoundUseCase
} from '../../domain/usecases';
import { RelaxingSoundRepository } from '../../infrastructure/database';
import { CreateRelaxingSoundDTO, UpdateRelaxingSoundDTO } from '../dto';
import { ZodError } from 'zod';
import { Logger } from '../../infrastructure/logger/Logger';

const repository = new RelaxingSoundRepository();

export class RelaxingSoundController {
  static async create(req: Request, res: Response) {
    try {
      const data = CreateRelaxingSoundDTO.parse(req.body);
      const useCase = new CreateRelaxingSoundUseCase(repository);
      const result = await useCase.execute(data);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      Logger.danger('Error en RelaxingSoundController.create', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const useCase = new GetAllRelaxingSoundsUseCase(repository);
      const result = await useCase.execute();
      res.json(result);
    } catch (error) {
      Logger.danger('Error en RelaxingSoundController.findAll', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const useCase = new GetRelaxingSoundByIdUseCase(repository);
      const result = await useCase.execute(id);
      
      if (!result) {
        res.status(404).json({ error: 'Sonido relajante no encontrado' });
        return;
      }
      
      res.json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en RelaxingSoundController.findById', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = UpdateRelaxingSoundDTO.parse(req.body);
      const useCase = new UpdateRelaxingSoundUseCase(repository);
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
      Logger.danger('Error en RelaxingSoundController.update', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const useCase = new DeleteRelaxingSoundUseCase(repository);
      await useCase.execute(id);
      res.status(204).send();
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en RelaxingSoundController.delete', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }
}
