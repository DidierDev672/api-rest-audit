import { Request, Response } from 'express';
import {
  CreateCalendarEventUseCase,
  GetCalendarEventsByDateRangeUseCase,
  GetCalendarEventByIdUseCase,
  UpdateCalendarEventUseCase,
  DeleteCalendarEventUseCase,
} from '../../domain/usecases';
import { CalendarEventRepository, AuditoryResearchRepository, CalendarAiAnalysisRepository } from '../../infrastructure/database';
import { GetAllAuditoryResearchUseCase } from '../../domain/usecases';
import { CreateCalendarEventDTO, UpdateCalendarEventDTO, CalendarEventQueryDTO } from '../dto';
import { ZodError } from 'zod';
import { Logger } from '../../infrastructure/logger/Logger';

const repository = new CalendarEventRepository();

function getDefaultMonthRange(): { from: string; to: string } {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const from = `${year}-${month}-01`;
  const lastDay = new Date(year, now.getMonth() + 1, 0).getDate();
  const to = `${year}-${month}-${String(lastDay).padStart(2, '0')}`;
  return { from, to };
}

export class CalendarEventController {
  static async create(req: Request, res: Response) {
    try {
      const data = CreateCalendarEventDTO.parse(req.body);
      const useCase = new CreateCalendarEventUseCase(repository);
      const result = await useCase.execute(data);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      Logger.danger('Error en CalendarEventController.create', { error: (error as Error).message });
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const query = CalendarEventQueryDTO.parse(req.query);
      const { from, to } = query.from && query.to ? query as { from: string; to: string } : getDefaultMonthRange();

      const useCase = new GetCalendarEventsByDateRangeUseCase(repository);
      const events = await useCase.execute(from, to);

      const researchRepo = new AuditoryResearchRepository();
      const researchUseCase = new GetAllAuditoryResearchUseCase(researchRepo);
      const researchList = await researchUseCase.execute();

      const researchMap = new Map(researchList.map(r => [r.id, r.name]));

      const aiRepo = new CalendarAiAnalysisRepository();
      const eventIds = events.map(e => e.id);
      const analysisSummary = await aiRepo.getEventAnalysisSummary(eventIds);
      const analysisMap = new Map(analysisSummary.map(a => [a.calendarEventId, a]));

      const eventsWithDate = events.map(event => {
        const summary = analysisMap.get(event.id);
        return {
          ...event,
          date: event.startDate,
          researchName: event.researchId ? (researchMap.get(event.researchId) || null) : null,
          hasAiAnalysis: summary ? summary.count > 0 : false,
          lastAiAnalysisAt: summary?.lastGeneratedAt || null,
        };
      });

      res.json({
        researchList,
        events: eventsWithDate,
        meta: { from, to },
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en CalendarEventController.findAll', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const useCase = new GetCalendarEventByIdUseCase(repository);
      const result = await useCase.execute(id);

      if (!result) {
        res.status(404).json({ error: 'Evento de calendario no encontrado' });
        return;
      }

      const eventWithDate = {
        ...result,
        date: result.startDate,
      };

      if (result.researchId) {
        const researchRepo = new AuditoryResearchRepository();
        const research = await researchRepo.findById(result.researchId);
        const eventWithResearch = { ...eventWithDate, researchName: research?.name || null };
        res.json(eventWithResearch);
        return;
      }

      res.json({ ...eventWithDate, researchName: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en CalendarEventController.findById', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = UpdateCalendarEventDTO.parse(req.body);
      const useCase = new UpdateCalendarEventUseCase(repository);
      const result = await useCase.execute(id, data);
      res.json(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
        return;
      }
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido') || errorMessage.includes('no encontrada')) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en CalendarEventController.update', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const useCase = new DeleteCalendarEventUseCase(repository);
      await useCase.execute(id);
      res.status(204).send();
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido') || errorMessage.includes('no encontrada')) {
        res.status(400).json({ error: errorMessage });
        return;
      }
      Logger.danger('Error en CalendarEventController.delete', { error: errorMessage });
      res.status(500).json({ error: errorMessage });
    }
  }
}
