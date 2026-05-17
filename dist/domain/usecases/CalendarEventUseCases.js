"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCalendarEventUseCase = exports.UpdateCalendarEventUseCase = exports.GetCalendarEventByIdUseCase = exports.GetCalendarEventsByDateRangeUseCase = exports.CreateCalendarEventUseCase = void 0;
const Logger_1 = require("../../infrastructure/logger/Logger");
const IdValidator_1 = require("../../infrastructure/validators/IdValidator");
class CreateCalendarEventUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(data) {
        try {
            Logger_1.Logger.info('Creando evento de calendario', { title: data.title });
            if (data.endDate < data.startDate) {
                throw new Error('endDate debe ser mayor o igual a startDate');
            }
            if (data.endDate === data.startDate && data.endTime <= data.startTime) {
                throw new Error('endTime debe ser mayor a startTime cuando es el mismo día');
            }
            const result = await this.repository.create({
                type: data.type,
                title: data.title,
                description: data.description || '',
                startDate: data.startDate,
                endDate: data.endDate,
                startTime: data.startTime,
                endTime: data.endTime,
                researchId: data.researchId || null,
            });
            Logger_1.Logger.success('Evento de calendario creado exitosamente', { id: result.id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al crear evento de calendario', { error: error.message });
            throw error;
        }
    }
}
exports.CreateCalendarEventUseCase = CreateCalendarEventUseCase;
class GetCalendarEventsByDateRangeUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(from, to) {
        try {
            Logger_1.Logger.info('Obteniendo eventos de calendario por rango', { from, to });
            const result = await this.repository.findByDateRange(from, to);
            Logger_1.Logger.success('Eventos de calendario obtenidos', { count: result.length });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener eventos de calendario', { error: error.message });
            throw error;
        }
    }
}
exports.GetCalendarEventsByDateRangeUseCase = GetCalendarEventsByDateRangeUseCase;
class GetCalendarEventByIdUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        try {
            IdValidator_1.IdValidator.validate(id, 'CalendarEvent');
            Logger_1.Logger.info('Obteniendo evento de calendario por ID', { id });
            const result = await this.repository.findById(id);
            if (!result) {
                Logger_1.Logger.warning('Evento de calendario no encontrado', { id });
                return null;
            }
            Logger_1.Logger.success('Evento de calendario obtenido', { id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al obtener evento de calendario por ID', { error: error.message });
            throw error;
        }
    }
}
exports.GetCalendarEventByIdUseCase = GetCalendarEventByIdUseCase;
class UpdateCalendarEventUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id, data) {
        try {
            IdValidator_1.IdValidator.validate(id, 'CalendarEvent');
            Logger_1.Logger.info('Actualizando evento de calendario', { id });
            const existing = await this.repository.findById(id);
            if (!existing) {
                throw new Error('Evento de calendario no encontrada');
            }
            const result = await this.repository.update(id, data);
            Logger_1.Logger.success('Evento de calendario actualizado', { id });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al actualizar evento de calendario', { error: error.message });
            throw error;
        }
    }
}
exports.UpdateCalendarEventUseCase = UpdateCalendarEventUseCase;
class DeleteCalendarEventUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        try {
            IdValidator_1.IdValidator.validate(id, 'CalendarEvent');
            Logger_1.Logger.info('Eliminando evento de calendario', { id });
            const existing = await this.repository.findById(id);
            if (!existing) {
                throw new Error('Evento de calendario no encontrada');
            }
            await this.repository.delete(id);
            Logger_1.Logger.success('Evento de calendario eliminado', { id });
        }
        catch (error) {
            Logger_1.Logger.danger('Error al eliminar evento de calendario', { error: error.message });
            throw error;
        }
    }
}
exports.DeleteCalendarEventUseCase = DeleteCalendarEventUseCase;
//# sourceMappingURL=CalendarEventUseCases.js.map