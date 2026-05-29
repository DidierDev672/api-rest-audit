import { Request, Response } from 'express';
import { ZodError } from 'zod';
import {
  CreateCalendarAnalysisNoteUseCase,
  GetCalendarAnalysisNotesUseCase,
  GetCalendarAnalysisNoteByIdUseCase,
  DeleteCalendarAnalysisNoteUseCase,
} from '../../domain/usecases/CalendarAnalysisNoteUseCases';
import {
  CalendarAnalysisNoteRepository,
  CalendarAiAnalysisRepository,
} from '../../infrastructure/database';
import {
  CreateCalendarAnalysisNoteDTO,
  CalendarAnalysisNoteQueryDTO,
} from '../dto/CalendarAnalysisNoteDTO';
import { Logger } from '../../infrastructure/logger/Logger';

const noteRepository = new CalendarAnalysisNoteRepository();
const analysisRepository = new CalendarAiAnalysisRepository();

export class CalendarAnalysisNoteController {
  static async create(req: Request, res: Response) {
    try {
      const data = CreateCalendarAnalysisNoteDTO.parse(req.body);
      const useCase = new CreateCalendarAnalysisNoteUseCase(
        noteRepository,
        analysisRepository,
      );

      const result = await useCase.execute({
        calendarAiAnalysisId: data.calendar_ai_analysis_id,
        content: data.content,
        color: data.color,
        colorName: data.color_name,
        createdAt: data.created_at,
      });

      res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      const message = (error as Error).message;
      if (message.includes('no encontrado')) {
        res.status(404).json({ error: message });
        return;
      }
      Logger.danger('Error en CalendarAnalysisNoteController.create', { error: message });
      res.status(500).json({ error: message });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const query = CalendarAnalysisNoteQueryDTO.parse(req.query);
      const useCase = new GetCalendarAnalysisNotesUseCase(noteRepository);
      const result = await useCase.execute(query.calendar_ai_analysis_id);
      res.json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      Logger.danger('Error en CalendarAnalysisNoteController.findAll', {
        error: (error as Error).message,
      });
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async findByAnalysisId(req: Request, res: Response) {
    try {
      const { calendarAiAnalysisId } = req.params;
      const useCase = new GetCalendarAnalysisNotesUseCase(noteRepository);
      const result = await useCase.execute(calendarAiAnalysisId);
      res.json(result);
    } catch (error) {
      const message = (error as Error).message;
      if (message.includes('no es válido') || message.includes('es requerido')) {
        res.status(400).json({ error: message });
        return;
      }
      Logger.danger('Error en CalendarAnalysisNoteController.findByAnalysisId', {
        error: message,
      });
      res.status(500).json({ error: message });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const useCase = new GetCalendarAnalysisNoteByIdUseCase(noteRepository);
      const result = await useCase.execute(id);

      if (!result) {
        res.status(404).json({ error: 'Nota no encontrada' });
        return;
      }

      res.json(result);
    } catch (error) {
      const message = (error as Error).message;
      if (message.includes('no es válido') || message.includes('es requerido')) {
        res.status(400).json({ error: message });
        return;
      }
      Logger.danger('Error en CalendarAnalysisNoteController.findById', { error: message });
      res.status(500).json({ error: message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const useCase = new DeleteCalendarAnalysisNoteUseCase(noteRepository);
      await useCase.execute(id);
      res.status(204).send();
    } catch (error) {
      const message = (error as Error).message;
      if (message.includes('no encontrada')) {
        res.status(404).json({ error: message });
        return;
      }
      Logger.danger('Error en CalendarAnalysisNoteController.delete', { error: message });
      res.status(500).json({ error: message });
    }
  }
}
