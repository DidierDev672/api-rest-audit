import { z } from 'zod';
export declare const CreateCalendarAiAnalysisSchema: z.ZodObject<{
    calendarEventId: z.ZodString;
    researchId: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
    eventTitle: z.ZodString;
    eventType: z.ZodEnum<["task", "research"]>;
    eventDate: z.ZodString;
    researchName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    content: z.ZodString;
    model: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    generatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    content: string;
    calendarEventId: string;
    eventTitle: string;
    eventType: "task" | "research";
    eventDate: string;
    generatedAt: string;
    researchId?: string | number | null | undefined;
    researchName?: string | null | undefined;
    model?: string | null | undefined;
}, {
    content: string;
    calendarEventId: string;
    eventTitle: string;
    eventType: "task" | "research";
    eventDate: string;
    generatedAt: string;
    researchId?: string | number | null | undefined;
    researchName?: string | null | undefined;
    model?: string | null | undefined;
}>;
export declare const CalendarAiAnalysisQuerySchema: z.ZodObject<{
    calendarEventId: z.ZodOptional<z.ZodString>;
    researchId: z.ZodOptional<z.ZodString>;
    from: z.ZodOptional<z.ZodString>;
    to: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    calendarEventId?: string | undefined;
    researchId?: string | undefined;
    from?: string | undefined;
    to?: string | undefined;
}, {
    calendarEventId?: string | undefined;
    researchId?: string | undefined;
    from?: string | undefined;
    to?: string | undefined;
}>;
export declare const CreateCalendarAiAnalysisDTO: z.ZodObject<{
    calendarEventId: z.ZodString;
    researchId: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
    eventTitle: z.ZodString;
    eventType: z.ZodEnum<["task", "research"]>;
    eventDate: z.ZodString;
    researchName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    content: z.ZodString;
    model: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    generatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    content: string;
    calendarEventId: string;
    eventTitle: string;
    eventType: "task" | "research";
    eventDate: string;
    generatedAt: string;
    researchId?: string | number | null | undefined;
    researchName?: string | null | undefined;
    model?: string | null | undefined;
}, {
    content: string;
    calendarEventId: string;
    eventTitle: string;
    eventType: "task" | "research";
    eventDate: string;
    generatedAt: string;
    researchId?: string | number | null | undefined;
    researchName?: string | null | undefined;
    model?: string | null | undefined;
}>;
export declare const CalendarAiAnalysisQueryDTO: z.ZodObject<{
    calendarEventId: z.ZodOptional<z.ZodString>;
    researchId: z.ZodOptional<z.ZodString>;
    from: z.ZodOptional<z.ZodString>;
    to: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    calendarEventId?: string | undefined;
    researchId?: string | undefined;
    from?: string | undefined;
    to?: string | undefined;
}, {
    calendarEventId?: string | undefined;
    researchId?: string | undefined;
    from?: string | undefined;
    to?: string | undefined;
}>;
export type CreateCalendarAiAnalysisDTO = z.infer<typeof CreateCalendarAiAnalysisSchema>;
export type CalendarAiAnalysisQueryDTO = z.infer<typeof CalendarAiAnalysisQuerySchema>;
//# sourceMappingURL=CalendarAiAnalysisDTO.d.ts.map