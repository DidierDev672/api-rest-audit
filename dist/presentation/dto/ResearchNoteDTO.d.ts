import { z } from 'zod';
export declare const CreateResearchNoteSchema: z.ZodObject<{
    id: z.ZodString;
    research_id: z.ZodString;
    id_note: z.ZodString;
    text: z.ZodString;
    color: z.ZodString;
    color_name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    text: string;
    color: string;
    research_id: string;
    id_note: string;
    color_name: string;
}, {
    id: string;
    text: string;
    color: string;
    research_id: string;
    id_note: string;
    color_name: string;
}>;
export declare const CreateResearchNoteDTO: z.ZodObject<{
    id: z.ZodString;
    research_id: z.ZodString;
    id_note: z.ZodString;
    text: z.ZodString;
    color: z.ZodString;
    color_name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    text: string;
    color: string;
    research_id: string;
    id_note: string;
    color_name: string;
}, {
    id: string;
    text: string;
    color: string;
    research_id: string;
    id_note: string;
    color_name: string;
}>;
export type CreateResearchNoteDTO = z.infer<typeof CreateResearchNoteSchema>;
//# sourceMappingURL=ResearchNoteDTO.d.ts.map