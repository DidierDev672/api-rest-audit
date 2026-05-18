"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopCalendarTaskScheduler = exports.startCalendarTaskScheduler = void 0;
const CalendarScheduledTaskUseCases_1 = require("../../domain/usecases/CalendarScheduledTaskUseCases");
const database_1 = require("../database");
const CalendarNotificationGateway_1 = require("../clients/CalendarNotificationGateway");
const Logger_1 = require("../logger/Logger");
let intervalId = null;
function startCalendarTaskScheduler() {
    const enabled = process.env.CALENDAR_SCHEDULER_ENABLED === 'true';
    if (!enabled) {
        Logger_1.Logger.info('Programador de tareas de calendario desactivado (CALENDAR_SCHEDULER_ENABLED != true)');
        return;
    }
    const intervalMs = Number(process.env.CALENDAR_SCHEDULER_INTERVAL_MS ?? 60000);
    const batchLimit = Number(process.env.CALENDAR_SCHEDULER_BATCH_LIMIT ?? 50);
    const useCase = new CalendarScheduledTaskUseCases_1.ProcessDueCalendarScheduledTasksUseCase(new database_1.CalendarScheduledTaskRepository(), new database_1.CalendarEventRepository(), new database_1.CalendarNotificationRepository(), CalendarNotificationGateway_1.CalendarNotificationGateway.create());
    const run = async () => {
        try {
            await useCase.execute(batchLimit);
        }
        catch (error) {
            Logger_1.Logger.danger('Error en el programador de tareas de calendario', {
                error: error.message,
            });
        }
    };
    void run();
    intervalId = setInterval(() => {
        void run();
    }, intervalMs);
    Logger_1.Logger.success('Programador de tareas de calendario iniciado', {
        intervalMs,
        batchLimit,
    });
}
exports.startCalendarTaskScheduler = startCalendarTaskScheduler;
function stopCalendarTaskScheduler() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}
exports.stopCalendarTaskScheduler = stopCalendarTaskScheduler;
//# sourceMappingURL=CalendarTaskScheduler.js.map