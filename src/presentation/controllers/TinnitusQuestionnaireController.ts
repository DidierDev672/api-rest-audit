import { Request, Response } from 'express';
import { 
  CreateTinnitusQuestionnaireUseCase, 
  GetAllTinnitusQuestionnairesUseCase, 
  GetTinnitusQuestionnaireByIdUseCase,
  UpdateTinnitusQuestionnaireUseCase,
  DeleteTinnitusQuestionnaireUseCase
} from '../../domain/usecases';
import { TinnitusQuestionnaireRepository } from '../../infrastructure/database';
import { CreateTinnitusQuestionnaireDTO, UpdateTinnitusQuestionnaireDTO } from '../dto';
import { ZodError } from 'zod';
import { Logger } from '../../infrastructure/logger/Logger';

const repository = new TinnitusQuestionnaireRepository();

export class TinnitusQuestionnaireController {
  static async create(req: Request, res: Response) {
    try {
      const data = CreateTinnitusQuestionnaireDTO.parse(req.body);
      const useCase = new CreateTinnitusQuestionnaireUseCase(repository);
      const result = await useCase.execute(data);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      Logger.danger('Error en TinnitusQuestionnaireController.create', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const useCase = new GetAllTinnitusQuestionnairesUseCase(repository);
      const result = await useCase.execute();
      res.json(result);
    } catch (error) {
      Logger.danger('Error en TinnitusQuestionnaireController.findAll', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const useCase = new GetTinnitusQuestionnaireByIdUseCase(repository);
      const result = await useCase.execute(id);
      
      if (!result) {
        res.status(404).json({ error: 'Cuestionario no encontrado' });
        return;
      }
      
      res.json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en TinnitusQuestionnaireController.findById', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = UpdateTinnitusQuestionnaireDTO.parse(req.body);
      const useCase = new UpdateTinnitusQuestionnaireUseCase(repository);
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
      Logger.danger('Error en TinnitusQuestionnaireController.update', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const useCase = new DeleteTinnitusQuestionnaireUseCase(repository);
      await useCase.execute(id);
      res.status(204).send();
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en TinnitusQuestionnaireController.delete', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }
}
