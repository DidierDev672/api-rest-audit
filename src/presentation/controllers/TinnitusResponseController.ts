import { Request, Response } from 'express';
import { 
  CreateTinnitusResponseUseCase, 
  GetAllTinnitusResponsesUseCase, 
  GetTinnitusResponseByIdUseCase,
  GetTinnitusResponsesByPatientIdUseCase,
  GetTinnitusResponsesByQuestionnaireIdUseCase,
  UpdateTinnitusResponseUseCase,
  DeleteTinnitusResponseUseCase
} from '../../domain/usecases';
import { TinnitusResponseRepository } from '../../infrastructure/database';
import { CreateTinnitusResponseDTO, UpdateTinnitusResponseDTO } from '../dto';
import { ZodError } from 'zod';
import { Logger } from '../../infrastructure/logger/Logger';

const repository = new TinnitusResponseRepository();

export class TinnitusResponseController {
  static async create(req: Request, res: Response) {
    try {
      const data = CreateTinnitusResponseDTO.parse(req.body);
      const useCase = new CreateTinnitusResponseUseCase(repository);
      const result = await useCase.execute(data);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      Logger.danger('Error en TinnitusResponseController.create', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const useCase = new GetAllTinnitusResponsesUseCase(repository);
      const result = await useCase.execute();
      res.json(result);
    } catch (error) {
      Logger.danger('Error en TinnitusResponseController.findAll', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const useCase = new GetTinnitusResponseByIdUseCase(repository);
      const result = await useCase.execute(id);
      
      if (!result) {
        res.status(404).json({ error: 'Respuesta de cuestionario no encontrada' });
        return;
      }
      
      res.json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en TinnitusResponseController.findById', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async findByPatientId(req: Request, res: Response) {
    try {
      const { patientId } = req.params;
      const useCase = new GetTinnitusResponsesByPatientIdUseCase(repository);
      const result = await useCase.execute(patientId);
      res.json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en TinnitusResponseController.findByPatientId', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async findByQuestionnaireId(req: Request, res: Response) {
    try {
      const { questionnaireId } = req.params;
      const useCase = new GetTinnitusResponsesByQuestionnaireIdUseCase(repository);
      const result = await useCase.execute(questionnaireId);
      res.json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en TinnitusResponseController.findByQuestionnaireId', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = UpdateTinnitusResponseDTO.parse(req.body);
      const useCase = new UpdateTinnitusResponseUseCase(repository);
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
      Logger.danger('Error en TinnitusResponseController.update', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const useCase = new DeleteTinnitusResponseUseCase(repository);
      await useCase.execute(id);
      res.status(204).send();
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en TinnitusResponseController.delete', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }
}