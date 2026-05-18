"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarScheduleCalculator = void 0;
class CalendarScheduleCalculator {
    static eventStartAt(event) {
        const [year, month, day] = event.startDate.split('-').map(Number);
        const [hours, minutes] = event.startTime.split(':').map(Number);
        return new Date(year, month - 1, day, hours, minutes, 0, 0);
    }
    static reminderAt(event, minutesBefore) {
        const startAt = this.eventStartAt(event);
        return new Date(startAt.getTime() - minutesBefore * 60 * 1000);
    }
    static toIsoString(date) {
        return date.toISOString();
    }
}
exports.CalendarScheduleCalculator = CalendarScheduleCalculator;
//# sourceMappingURL=CalendarScheduleCalculator.js.map