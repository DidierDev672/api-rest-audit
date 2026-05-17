"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarEventQueryDTO = exports.UpdateCalendarEventDTO = exports.CreateCalendarEventDTO = exports.CalendarEventQuerySchema = exports.UpdateCalendarEventSchema = exports.CreateCalendarEventSchema = void 0;
const zod_1 = require("zod");
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const timeRegex = /^\d{2}:\d{2}$/;
exports.CreateCalendarEventSchema = zod_1.z.object({
    type: zod_1.z.enum(['task', 'research'], { required_error: 'type es requerido (task | research)' }),
    title: zod_1.z.string().min(1, 'El título es requerido'),
    description: zod_1.z.string().default(''),
    startDate: zod_1.z.string().regex(dateRegex, 'startDate debe ser YYYY-MM-DD'),
    endDate: zod_1.z.string().regex(dateRegex, 'endDate debe ser YYYY-MM-DD'),
    startTime: zod_1.z.string().regex(timeRegex, 'startTime debe ser HH:mm'),
    endTime: zod_1.z.string().regex(timeRegex, 'endTime debe ser HH:mm'),
    researchId: zod_1.z.string().uuid('researchId debe ser un UUID válido').nullable().optional(),
});
exports.UpdateCalendarEventSchema = zod_1.z.object({
    type: zod_1.z.enum(['task', 'research']).optional(),
    title: zod_1.z.string().min(1).optional(),
    description: zod_1.z.string().optional(),
    startDate: zod_1.z.string().regex(dateRegex, 'startDate debe ser YYYY-MM-DD').optional(),
    endDate: zod_1.z.string().regex(dateRegex, 'endDate debe ser YYYY-MM-DD').optional(),
    startTime: zod_1.z.string().regex(timeRegex, 'startTime debe ser HH:mm').optional(),
    endTime: zod_1.z.string().regex(timeRegex, 'endTime debe ser HH:mm').optional(),
    researchId: zod_1.z.string().uuid('researchId debe ser un UUID válido').nullable().optional(),
});
exports.CalendarEventQuerySchema = zod_1.z.object({
    from: zod_1.z.string().regex(dateRegex, 'from debe ser YYYY-MM-DD').optional(),
    to: zod_1.z.string().regex(dateRegex, 'to debe ser YYYY-MM-DD').optional(),
});
exports.CreateCalendarEventDTO = exports.CreateCalendarEventSchema;
exports.UpdateCalendarEventDTO = exports.UpdateCalendarEventSchema;
exports.CalendarEventQueryDTO = exports.CalendarEventQuerySchema;
//# sourceMappingURL=CalendarEventDTO.js.map