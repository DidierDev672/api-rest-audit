import { z } from 'zod';
declare const NoteItemSchema: z.ZodObject<{
    id: z.ZodString;
    text: z.ZodString;
    color: z.ZodString;
    colorName: z.ZodString;
    createdAt: z.ZodString;
    sourceMessageIndex: z.ZodOptional<z.ZodNumber>;
    sourceContent: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    text: string;
    color: string;
    colorName: string;
    sourceMessageIndex?: number | undefined;
    sourceContent?: string | undefined;
}, {
    id: string;
    createdAt: string;
    text: string;
    color: string;
    colorName: string;
    sourceMessageIndex?: number | undefined;
    sourceContent?: string | undefined;
}>;
export declare const CreateResearchNotesSchema: z.ZodObject<{
    researchId: z.ZodString;
    notes: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        text: z.ZodString;
        color: z.ZodString;
        colorName: z.ZodString;
        createdAt: z.ZodString;
        sourceMessageIndex: z.ZodOptional<z.ZodNumber>;
        sourceContent: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: string;
        text: string;
        color: string;
        colorName: string;
        sourceMessageIndex?: number | undefined;
        sourceContent?: string | undefined;
    }, {
        id: string;
        createdAt: string;
        text: string;
        color: string;
        colorName: string;
        sourceMessageIndex?: number | undefined;
        sourceContent?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    researchId: string;
    notes: {
        id: string;
        createdAt: string;
        text: string;
        color: string;
        colorName: string;
        sourceMessageIndex?: number | undefined;
        sourceContent?: string | undefined;
    }[];
}, {
    researchId: string;
    notes: {
        id: string;
        createdAt: string;
        text: string;
        color: string;
        colorName: string;
        sourceMessageIndex?: number | undefined;
        sourceContent?: string | undefined;
    }[];
}>;
export declare const CreateResearchNotesDTO: z.ZodObject<{
    researchId: z.ZodString;
    notes: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        text: z.ZodString;
        color: z.ZodString;
        colorName: z.ZodString;
        createdAt: z.ZodString;
        sourceMessageIndex: z.ZodOptional<z.ZodNumber>;
        sourceContent: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: string;
        text: string;
        color: string;
        colorName: string;
        sourceMessageIndex?: number | undefined;
        sourceContent?: string | undefined;
    }, {
        id: string;
        createdAt: string;
        text: string;
        color: string;
        colorName: string;
        sourceMessageIndex?: number | undefined;
        sourceContent?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    researchId: string;
    notes: {
        id: string;
        createdAt: string;
        text: string;
        color: string;
        colorName: string;
        sourceMessageIndex?: number | undefined;
        sourceContent?: string | undefined;
    }[];
}, {
    researchId: string;
    notes: {
        id: string;
        createdAt: string;
        text: string;
        color: string;
        colorName: string;
        sourceMessageIndex?: number | undefined;
        sourceContent?: string | undefined;
    }[];
}>;
export type CreateResearchNotesDTO = z.infer<typeof CreateResearchNotesSchema>;
export type NoteItemDTO = z.infer<typeof NoteItemSchema>;
export {};
//# sourceMappingURL=ResearchNoteDTO.d.ts.map