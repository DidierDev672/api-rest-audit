import { Request, Response } from 'express';
import {
  CreateCalendarAiAnalysisUseCase,
  GetCalendarAiAnalysesUseCase,
  GetCalendarAiAnalysisByIdUseCase,
  UpdateCalendarAiAnalysisUseCase,
  DeleteCalendarAiAnalysisUseCase,
} from '../../domain/usecases';
import { CalendarAiAnalysisRepository } from '../../infrastructure/database';
import {
  CreateCalendarAiAnalysisDTO,
  CalendarAiAnalysisQueryDTO,
  UpdateCalendarAiAnalysisDTO,
} from '../dto';
import { ZodError } from 'zod';
import { Logger } from '../../infrastructure/logger/Logger';

const repository = new CalendarAiAnalysisRepository();

export class CalendarAiAnalysisController {
  static async create(req: Request, res: Response) {
    try {
      const data = CreateCalendarAiAnalysisDTO.parse(req.body);
      const useCase = new CreateCalendarAiAnalysisUseCase(repository);
      const result = await useCase.execute(data);
      res.status(201).json({
        id: result.id,
        calendarEventId: result.calendarEventId,
        createdAt: result.createdAt,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      Logger.danger('Error en CalendarAiAnalysisController.create', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const query = CalendarAiAnalysisQueryDTO.parse(req.query);
      const useCase = new GetCalendarAiAnalysesUseCase(repository);
      const result = await useCase.execute(query);
      res.json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en CalendarAiAnalysisController.findAll', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const useCase = new GetCalendarAiAnalysisByIdUseCase(repository);
      const result = await useCase.execute(id);

      if (!result) {
        res.status(404).json({ error: 'Análisis IA de calendario no encontrado' });
        return;
      }

      res.json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en CalendarAiAnalysisController.findById', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const body = UpdateCalendarAiAnalysisDTO.parse(req.body);
      const useCase = new UpdateCalendarAiAnalysisUseCase(repository);
      const result = await useCase.execute(id, body);
      res.json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      const errorMessage = (error as Error).message;
      if (
        errorMessage.includes('ID es requerido') ||
        errorMessage.includes('no es válido') ||
        errorMessage.includes('no encontrada')
      ) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en CalendarAiAnalysisController.update', {
        error: errorMessage,
      });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const useCase = new DeleteCalendarAiAnalysisUseCase(repository);
      await useCase.execute(id);
      res.status(204).send();
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido') || errorMessage.includes('no encontrada')) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en CalendarAiAnalysisController.delete', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }
}
