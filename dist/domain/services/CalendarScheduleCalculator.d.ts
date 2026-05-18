import { CalendarEvent } from '../entities';
export declare class CalendarScheduleCalculator {
    static eventStartAt(event: CalendarEvent): Date;
    static reminderAt(event: CalendarEvent, minutesBefore: number): Date;
    static toIsoString(date: Date): string;
}
//# sourceMappingURL=CalendarScheduleCalculator.d.ts.map