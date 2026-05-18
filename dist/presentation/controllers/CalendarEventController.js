"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarEventController = void 0;
const usecases_1 = require("../../domain/usecases");
const database_1 = require("../../infrastructure/database");
const usecases_2 = require("../../domain/usecases");
const dto_1 = require("../dto");
const zod_1 = require("zod");
const Logger_1 = require("../../infrastructure/logger/Logger");
const repository = new database_1.CalendarEventRepository();
function getDefaultMonthRange() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const from = `${year}-${month}-01`;
    const lastDay = new Date(year, now.getMonth() + 1, 0).getDate();
    const to = `${year}-${month}-${String(lastDay).padStart(2, '0')}`;
    return { from, to };
}
class CalendarEventController {
    static async create(req, res) {
        try {
            const data = dto_1.CreateCalendarEventDTO.parse(req.body);
            const useCase = new usecases_1.CreateCalendarEventUseCase(repository);
            const result = await useCase.execute(data);
            res.status(201).json(result);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                res.status(400).json({ error: error.errors });
                return;
            }
            Logger_1.Logger.danger('Error en CalendarEventController.create', { error: error.message });
            res.status(500).json({ error: error.message });
        }
    }
    static async findAll(req, res) {
        try {
            const query = dto_1.CalendarEventQueryDTO.parse(req.query);
            const { from, to } = query.from && query.to ? query : getDefaultMonthRange();
            const useCase = new usecases_1.GetCalendarEventsByDateRangeUseCase(repository);
            const events = await useCase.execute(from, to);
            const researchRepo = new database_1.AuditoryResearchRepository();
            const researchUseCase = new usecases_2.GetAllAuditoryResearchUseCase(researchRepo);
            const researchList = await researchUseCase.execute();
            const researchMap = new Map(researchList.map(r => [r.id, r.name]));
            const aiRepo = new database_1.CalendarAiAnalysisRepository();
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
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en CalendarEventController.findAll', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async findById(req, res) {
        try {
            const { id } = req.params;
            const useCase = new usecases_1.GetCalendarEventByIdUseCase(repository);
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
                const researchRepo = new database_1.AuditoryResearchRepository();
                const research = await researchRepo.findById(result.researchId);
                const eventWithResearch = { ...eventWithDate, researchName: research?.name || null };
                res.json(eventWithResearch);
                return;
            }
            res.json({ ...eventWithDate, researchName: null });
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en CalendarEventController.findById', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            const data = dto_1.UpdateCalendarEventDTO.parse(req.body);
            const useCase = new usecases_1.UpdateCalendarEventUseCase(repository);
            const result = await useCase.execute(id, data);
            res.json(result);
        }
        catch (error) {
            const errorMessage = error.message;
            if (error instanceof zod_1.ZodError) {
                res.status(400).json({ error: error.errors });
                return;
            }
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido') || errorMessage.includes('no encontrada')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en CalendarEventController.update', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const useCase = new usecases_1.DeleteCalendarEventUseCase(repository);
            await useCase.execute(id);
            await new database_1.CalendarScheduledTaskRepository().cancelByCalendarEventId(id);
            res.status(204).send();
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido') || errorMessage.includes('no encontrada')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en CalendarEventController.delete', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
}
exports.CalendarEventController = CalendarEventController;
//# sourceMappingURL=CalendarEventController.js.map