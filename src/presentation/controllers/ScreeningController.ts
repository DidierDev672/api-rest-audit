import { Request, Response } from 'express';
import { 
  CreateScreeningUseCase, 
  GetAllScreeningsUseCase, 
  GetScreeningByIdUseCase,
  UpdateScreeningUseCase,
  DeleteScreeningUseCase
} from '../../domain/usecases';
import { ScreeningRepository } from '../../infrastructure/database';
import { CreateScreeningSchema, UpdateScreeningSchema } from '../dto';
import { ZodError } from 'zod';
import { Logger } from '../../infrastructure/logger/Logger';
import { Screening } from '../../domain/entities';

const repository = new ScreeningRepository();

function toSnakeCase(screening: Screening) {
  return {
    id: screening.id,
    title: screening.title,
    description: screening.description,
    sound: screening.sound,
    options_answer: screening.optionsAnswer?.map(opt => ({
      id: opt.id,
      text: opt.text,
      value: typeof opt.value === 'number' ? opt.value : opt.value ? 1 : 0
    })) || [],
    created_at: screening.createdAt,
    updated_at: screening.updatedAt
  };
}

export class ScreeningController {
  static async create(req: Request, res: Response) {
    try {
      const data = CreateScreeningSchema.parse(req.body);
      const useCase = new CreateScreeningUseCase(repository);
      const result = await useCase.execute(data);
      res.status(201).json(toSnakeCase(result));
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      Logger.danger('Error en ScreeningController.create', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const useCase = new GetAllScreeningsUseCase(repository);
      const result = await useCase.execute();
      res.json(result.map(toSnakeCase));
    } catch (error) {
      Logger.danger('Error en ScreeningController.findAll', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const useCase = new GetScreeningByIdUseCase(repository);
      const result = await useCase.execute(id);
      
      if (!result) {
        res.status(404).json({ error: 'Tamizaje no encontrado' });
        return;
      }
      
      res.json(toSnakeCase(result));
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en ScreeningController.findById', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = UpdateScreeningSchema.parse(req.body);
      const useCase = new UpdateScreeningUseCase(repository);
      const result = await useCase.execute(id, data);
      res.json(toSnakeCase(result));
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
      Logger.danger('Error en ScreeningController.update', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const useCase = new DeleteScreeningUseCase(repository);
      await useCase.execute(id);
      res.status(204).send();
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en ScreeningController.delete', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }
}
