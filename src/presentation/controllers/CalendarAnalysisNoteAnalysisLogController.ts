import { Request, Response } from 'express';
import { ZodError } from 'zod';
import {
  CreateCalendarAnalysisNoteAnalysisLogUseCase,
  GetCalendarAnalysisNoteAnalysisLogsUseCase,
  GetCalendarAnalysisNoteAnalysisLogByIdUseCase,
} from '../../domain/usecases/CalendarAnalysisNoteAnalysisLogUseCases';
import {
  CalendarAnalysisNoteAnalysisLogRepository,
  CalendarAiAnalysisRepository,
} from '../../infrastructure/database';
import {
  CreateCalendarAnalysisNoteAnalysisLogDTO,
  CalendarAnalysisNoteAnalysisLogQueryDTO,
} from '../dto/CalendarAnalysisNoteAnalysisLogDTO';
import { Logger } from '../../infrastructure/logger/Logger';

const logRepository = new CalendarAnalysisNoteAnalysisLogRepository();
const analysisRepository = new CalendarAiAnalysisRepository();

export class CalendarAnalysisNoteAnalysisLogController {
  static async create(req: Request, res: Response) {
    try {
      const data = CreateCalendarAnalysisNoteAnalysisLogDTO.parse(req.body);
      const useCase = new CreateCalendarAnalysisNoteAnalysisLogUseCase(
        logRepository,
        analysisRepository,
      );

      const result = await useCase.execute({
        calendarAiAnalysisId: data.calendar_ai_analysis_id,
        analysis: data.analysis,
        noteCount: data.note_count,
        model: data.model,
        analyzedAt: data.analyzed_at,
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
      Logger.danger('Error en CalendarAnalysisNoteAnalysisLogController.create', {
        error: message,
      });
      res.status(500).json({ error: message });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const query = CalendarAnalysisNoteAnalysisLogQueryDTO.parse(req.query);
      const useCase = new GetCalendarAnalysisNoteAnalysisLogsUseCase(logRepository);
      const result = await useCase.execute(query.calendar_ai_analysis_id);
      res.json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      Logger.danger('Error en CalendarAnalysisNoteAnalysisLogController.findAll', {
        error: (error as Error).message,
      });
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async findByAnalysisId(req: Request, res: Response) {
    try {
      const { calendarAiAnalysisId } = req.params;
      const useCase = new GetCalendarAnalysisNoteAnalysisLogsUseCase(logRepository);
      const result = await useCase.execute(calendarAiAnalysisId);
      res.json(result);
    } catch (error) {
      const message = (error as Error).message;
      if (message.includes('no es válido') || message.includes('es requerido')) {
        res.status(400).json({ error: message });
        return;
      }
      Logger.danger('Error en CalendarAnalysisNoteAnalysisLogController.findByAnalysisId', {
        error: message,
      });
      res.status(500).json({ error: message });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const useCase = new GetCalendarAnalysisNoteAnalysisLogByIdUseCase(logRepository);
      const result = await useCase.execute(id);

      if (!result) {
        res.status(404).json({ error: 'Registro de análisis no encontrado' });
        return;
      }

      res.json(result);
    } catch (error) {
      const message = (error as Error).message;
      if (message.includes('no es válido') || message.includes('es requerido')) {
        res.status(400).json({ error: message });
        return;
      }
      Logger.danger('Error en CalendarAnalysisNoteAnalysisLogController.findById', {
        error: message,
      });
      res.status(500).json({ error: message });
    }
  }
}
