"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCalendarAiAnalysisUseCase = exports.GetCalendarAiAnalysisByIdUseCase = exports.GetCalendarAiAnalysesUseCase = exports.CreateCalendarAiAnalysisUseCase = void 0;
const Logger_1 = require("../../infrastructure/logger/Logger");
const IdValidator_1 = require("../../infrastructure/validators/IdValidator");
class CreateCalendarAiAnalysisUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(data) {
        try {
            Logger_1.Logger.info('Creando análisis IA de calendario', { calendarEventId: data.calendarEventId });
            const researchId = data.researchId != null ? String(data.researchId) : null;
            const result = await this.repository.create({
                calendarEventId: data.calendarEventId,
                researchId,
                eventTitle: data.eventTitle,
                eventType: data.eventType,
                eventDate: data.eventDate,
                researchName: data.researchName ?? null,
                content: data.content,
                model: data.model ?? null,
                generatedAt: new Date(data.generatedAt),
            });
            Logger_1.Logger.success('Análisis IA de calendario creado exitosamente', { id: result.id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al crear análisis IA de calendario', { error: error.message });
            throw error;
        }
    }
}
exports.CreateCalendarAiAnalysisUseCase = CreateCalendarAiAnalysisUseCase;
class GetCalendarAiAnalysesUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(filters) {
        try {
            Logger_1.Logger.info('Obteniendo análisis IA de calendario', { filters });
            const result = await this.repository.findAll(filters);
            Logger_1.Logger.success('Análisis IA de calendario obtenidos', { count: result.length });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener análisis IA de calendario', { error: error.message });
            throw error;
        }
    }
}
exports.GetCalendarAiAnalysesUseCase = GetCalendarAiAnalysesUseCase;
class GetCalendarAiAnalysisByIdUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        try {
            IdValidator_1.IdValidator.validate(id, 'CalendarAiAnalysis');
            Logger_1.Logger.info('Obteniendo análisis IA de calendario por ID', { id });
            const result = await this.repository.findById(id);
            if (!result) {
                Logger_1.Logger.warning('Análisis IA de calendario no encontrado', { id });
                return null;
            }
            Logger_1.Logger.success('Análisis IA de calendario obtenido', { id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener análisis IA de calendario por ID', { error: error.message });
            throw error;
        }
    }
}
exports.GetCalendarAiAnalysisByIdUseCase = GetCalendarAiAnalysisByIdUseCase;
class DeleteCalendarAiAnalysisUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        try {
            IdValidator_1.IdValidator.validate(id, 'CalendarAiAnalysis');
            Logger_1.Logger.info('Eliminando análisis IA de calendario', { id });
            const existing = await this.repository.findById(id);
            if (!existing) {
                throw new Error('Análisis IA de calendario no encontrada');
            }
            await this.repository.delete(id);
            Logger_1.Logger.success('Análisis IA de calendario eliminado', { id });
        }
        catch (error) {
            Logger_1.Logger.danger('Error al eliminar análisis IA de calendario', { error: error.message });
            throw error;
        }
    }
}
exports.DeleteCalendarAiAnalysisUseCase = DeleteCalendarAiAnalysisUseCase;
//# sourceMappingURL=CalendarAiAnalysisUseCases.js.map