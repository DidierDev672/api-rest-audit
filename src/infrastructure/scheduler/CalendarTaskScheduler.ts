import { ProcessDueCalendarScheduledTasksUseCase } from '../../domain/usecases/CalendarScheduledTaskUseCases';
import {
  CalendarEventRepository,
  CalendarScheduledTaskRepository,
  CalendarNotificationRepository,
} from '../database';
import { CalendarNotificationGateway } from '../clients/CalendarNotificationGateway';
import { Logger } from '../logger/Logger';

let intervalId: ReturnType<typeof setInterval> | null = null;

export function startCalendarTaskScheduler(): void {
  const enabled = process.env.CALENDAR_SCHEDULER_ENABLED === 'true';

  if (!enabled) {
    Logger.info(
      'Programador de tareas de calendario desactivado (CALENDAR_SCHEDULER_ENABLED != true)'
    );
    return;
  }

  const intervalMs = Number(process.env.CALENDAR_SCHEDULER_INTERVAL_MS ?? 60000);
  const batchLimit = Number(process.env.CALENDAR_SCHEDULER_BATCH_LIMIT ?? 50);

  const useCase = new ProcessDueCalendarScheduledTasksUseCase(
    new CalendarScheduledTaskRepository(),
    new CalendarEventRepository(),
    new CalendarNotificationRepository(),
    CalendarNotificationGateway.create()
  );

  const run = async () => {
    try {
      await useCase.execute(batchLimit);
    } catch (error) {
      Logger.danger('Error en el programador de tareas de calendario', {
        error: (error as Error).message,
      });
    }
  };

  void run();
  intervalId = setInterval(() => {
    void run();
  }, intervalMs);

  Logger.success('Programador de tareas de calendario iniciado', {
    intervalMs,
    batchLimit,
  });
}

export function stopCalendarTaskScheduler(): void {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}
