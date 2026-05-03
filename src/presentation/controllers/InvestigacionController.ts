import { Request, Response } from 'express';
import { 
  CreateInvestigacionUseCase, 
  GetAllInvestigacionesUseCase, 
  GetInvestigacionByIdUseCase
} from '../../domain/usecases';
import { InvestigacionRepository } from '../../infrastructure/database';
import { CreateInvestigacionDTO } from '../dto';
import { ZodError } from 'zod';
import { Logger } from '../../infrastructure/logger/Logger';

const repository = new InvestigacionRepository();

export class InvestigacionController {
  static async create(req: Request, res: Response) {
    try {
      const data = CreateInvestigacionDTO.parse(req.body);
      const useCase = new CreateInvestigacionUseCase(repository);
      const result = await useCase.execute(data);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      Logger.danger('Error en InvestigacionController.create', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const useCase = new GetAllInvestigacionesUseCase(repository);
      const result = await useCase.execute();
      res.json(result);
    } catch (error) {
      Logger.danger('Error en InvestigacionController.findAll', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const useCase = new GetInvestigacionByIdUseCase(repository);
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
      Logger.danger('Error en InvestigacionController.findById', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }
}