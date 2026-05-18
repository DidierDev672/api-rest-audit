import { CalendarEvent } from '../entities';

export class CalendarScheduleCalculator {
  static eventStartAt(event: CalendarEvent): Date {
    const [year, month, day] = event.startDate.split('-').map(Number);
    const [hours, minutes] = event.startTime.split(':').map(Number);

    return new Date(year, month - 1, day, hours, minutes, 0, 0);
  }

  static reminderAt(event: CalendarEvent, minutesBefore: number): Date {
    const startAt = this.eventStartAt(event);
    return new Date(startAt.getTime() - minutesBefore * 60 * 1000);
  }

  static toIsoString(date: Date): string {
    return date.toISOString();
  }
}
