"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarAiAnalysisQueryDTO = exports.CreateCalendarAiAnalysisDTO = exports.CalendarAiAnalysisQuerySchema = exports.CreateCalendarAiAnalysisSchema = void 0;
const zod_1 = require("zod");
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
exports.CreateCalendarAiAnalysisSchema = zod_1.z.object({
    calendarEventId: zod_1.z.string().min(1, 'calendarEventId es requerido'),
    researchId: zod_1.z.union([zod_1.z.string(), zod_1.z.number()]).nullable().optional(),
    eventTitle: zod_1.z.string().min(1, 'eventTitle es requerido'),
    eventType: zod_1.z.enum(['task', 'research'], { required_error: 'eventType es requerido (task | research)' }),
    eventDate: zod_1.z.string().regex(dateRegex, 'eventDate debe ser YYYY-MM-DD'),
    researchName: zod_1.z.string().nullable().optional(),
    content: zod_1.z.string().min(10, 'content debe tener al menos 10 caracteres'),
    model: zod_1.z.string().nullable().optional(),
    generatedAt: zod_1.z.string().datetime({ message: 'generatedAt debe ser ISO 8601' }),
});
exports.CalendarAiAnalysisQuerySchema = zod_1.z.object({
    calendarEventId: zod_1.z.string().optional(),
    researchId: zod_1.z.string().optional(),
    from: zod_1.z.string().regex(dateRegex, 'from debe ser YYYY-MM-DD').optional(),
    to: zod_1.z.string().regex(dateRegex, 'to debe ser YYYY-MM-DD').optional(),
});
exports.CreateCalendarAiAnalysisDTO = exports.CreateCalendarAiAnalysisSchema;
exports.CalendarAiAnalysisQueryDTO = exports.CalendarAiAnalysisQuerySchema;
//# sourceMappingURL=CalendarAiAnalysisDTO.js.map