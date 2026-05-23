import { z } from 'zod';
export declare const CreateCalendarEventSchema: z.ZodObject<{
    type: z.ZodEnum<["task", "research"]>;
    title: z.ZodString;
    description: z.ZodDefault<z.ZodString>;
    startDate: z.ZodString;
    endDate: z.ZodString;
    startTime: z.ZodString;
    endTime: z.ZodString;
    researchId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    type: "task" | "research";
    description: string;
    title: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    researchId?: string | null | undefined;
}, {
    type: "task" | "research";
    title: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    description?: string | undefined;
    researchId?: string | null | undefined;
}>;
export declare const UpdateCalendarEventSchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodEnum<["task", "research"]>>;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    startTime: z.ZodOptional<z.ZodString>;
    endTime: z.ZodOptional<z.ZodString>;
    researchId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    type?: "task" | "research" | undefined;
    title?: string | undefined;
    description?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    startTime?: string | undefined;
    endTime?: string | undefined;
    researchId?: string | null | undefined;
}, {
    type?: "task" | "research" | undefined;
    title?: string | undefined;
    description?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    startTime?: string | undefined;
    endTime?: string | undefined;
    researchId?: string | null | undefined;
}>;
export declare const CalendarEventQuerySchema: z.ZodObject<{
    from: z.ZodOptional<z.ZodString>;
    to: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    from?: string | undefined;
    to?: string | undefined;
}, {
    from?: string | undefined;
    to?: string | undefined;
}>;
export declare const CreateCalendarEventDTO: z.ZodObject<{
    type: z.ZodEnum<["task", "research"]>;
    title: z.ZodString;
    description: z.ZodDefault<z.ZodString>;
    startDate: z.ZodString;
    endDate: z.ZodString;
    startTime: z.ZodString;
    endTime: z.ZodString;
    researchId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    type: "task" | "research";
    description: string;
    title: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    researchId?: string | null | undefined;
}, {
    type: "task" | "research";
    title: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    description?: string | undefined;
    researchId?: string | null | undefined;
}>;
export declare const UpdateCalendarEventDTO: z.ZodObject<{
    type: z.ZodOptional<z.ZodEnum<["task", "research"]>>;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    startTime: z.ZodOptional<z.ZodString>;
    endTime: z.ZodOptional<z.ZodString>;
    researchId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    type?: "task" | "research" | undefined;
    title?: string | undefined;
    description?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    startTime?: string | undefined;
    endTime?: string | undefined;
    researchId?: string | null | undefined;
}, {
    type?: "task" | "research" | undefined;
    title?: string | undefined;
    description?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    startTime?: string | undefined;
    endTime?: string | undefined;
    researchId?: string | null | undefined;
}>;
export declare const CalendarEventQueryDTO: z.ZodObject<{
    from: z.ZodOptional<z.ZodString>;
    to: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    from?: string | undefined;
    to?: string | undefined;
}, {
    from?: string | undefined;
    to?: string | undefined;
}>;
export type CreateCalendarEventDTO = z.infer<typeof CreateCalendarEventSchema>;
export type UpdateCalendarEventDTO = z.infer<typeof UpdateCalendarEventSchema>;
export type CalendarEventQueryDTO = z.infer<typeof CalendarEventQuerySchema>;
//# sourceMappingURL=CalendarEventDTO.d.ts.map