"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarAiAnalysisController = void 0;
const usecases_1 = require("../../domain/usecases");
const database_1 = require("../../infrastructure/database");
const dto_1 = require("../dto");
const zod_1 = require("zod");
const Logger_1 = require("../../infrastructure/logger/Logger");
const repository = new database_1.CalendarAiAnalysisRepository();
class CalendarAiAnalysisController {
    static async create(req, res) {
        try {
            const data = dto_1.CreateCalendarAiAnalysisDTO.parse(req.body);
            const useCase = new usecases_1.CreateCalendarAiAnalysisUseCase(repository);
            const result = await useCase.execute(data);
            res.status(201).json({
                id: result.id,
                calendarEventId: result.calendarEventId,
                createdAt: result.createdAt,
            });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                res.status(400).json({ error: error.errors });
                return;
            }
            Logger_1.Logger.danger('Error en CalendarAiAnalysisController.create', { error: error.message });
            res.status(500).json({ error: error.message });
        }
    }
    static async findAll(req, res) {
        try {
            const query = dto_1.CalendarAiAnalysisQueryDTO.parse(req.query);
            const useCase = new usecases_1.GetCalendarAiAnalysesUseCase(repository);
            const result = await useCase.execute(query);
            res.json(result);
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en CalendarAiAnalysisController.findAll', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async findById(req, res) {
        try {
            const { id } = req.params;
            const useCase = new usecases_1.GetCalendarAiAnalysisByIdUseCase(repository);
            const result = await useCase.execute(id);
            if (!result) {
                res.status(404).json({ error: 'Análisis IA de calendario no encontrado' });
                return;
            }
            res.json(result);
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en CalendarAiAnalysisController.findById', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const useCase = new usecases_1.DeleteCalendarAiAnalysisUseCase(repository);
            await useCase.execute(id);
            res.status(204).send();
        }
        catch (error) {
            const errorMessage = error.message;
            if (errorMessage.includes('ID es requerido') || errorMessage.includes('no es válido') || errorMessage.includes('no encontrada')) {
                res.status(400).json({ error: errorMessage });
                return;
            }
            Logger_1.Logger.danger('Error en CalendarAiAnalysisController.delete', { error: errorMessage });
            res.status(500).json({ error: errorMessage });
        }
    }
}
exports.CalendarAiAnalysisController = CalendarAiAnalysisController;
//# sourceMappingURL=CalendarAiAnalysisController.js.map