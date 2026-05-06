import { z } from 'zod';
export declare const CreateScreeningSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    questions: z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        sound: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        optionsAnswer: z.ZodArray<z.ZodObject<{
            id: z.ZodOptional<z.ZodString>;
            text: z.ZodString;
            value: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            text: string;
            value: number;
            id?: string | undefined;
        }, {
            text: string;
            value: number;
            id?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        optionsAnswer: {
            text: string;
            value: number;
            id?: string | undefined;
        }[];
        sound: string;
        id?: string | undefined;
        title?: string | undefined;
        description?: string | undefined;
    }, {
        optionsAnswer: {
            text: string;
            value: number;
            id?: string | undefined;
        }[];
        sound: string;
        id?: string | undefined;
        title?: string | undefined;
        description?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    description: string;
    title: string;
    questions: {
        optionsAnswer: {
            text: string;
            value: number;
            id?: string | undefined;
        }[];
        sound: string;
        id?: string | undefined;
        title?: string | undefined;
        description?: string | undefined;
    }[];
}, {
    description: string;
    title: string;
    questions: {
        optionsAnswer: {
            text: string;
            value: number;
            id?: string | undefined;
        }[];
        sound: string;
        id?: string | undefined;
        title?: string | undefined;
        description?: string | undefined;
    }[];
}>;
export declare const UpdateScreeningSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    questions: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        sound: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        optionsAnswer: z.ZodArray<z.ZodObject<{
            id: z.ZodOptional<z.ZodString>;
            text: z.ZodString;
            value: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            text: string;
            value: number;
            id?: string | undefined;
        }, {
            text: string;
            value: number;
            id?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        optionsAnswer: {
            text: string;
            value: number;
            id?: string | undefined;
        }[];
        sound: string;
        id?: string | undefined;
        title?: string | undefined;
        description?: string | undefined;
    }, {
        optionsAnswer: {
            text: string;
            value: number;
            id?: string | undefined;
        }[];
        sound: string;
        id?: string | undefined;
        title?: string | undefined;
        description?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    description?: string | undefined;
    questions?: {
        optionsAnswer: {
            text: string;
            value: number;
            id?: string | undefined;
        }[];
        sound: string;
        id?: string | undefined;
        title?: string | undefined;
        description?: string | undefined;
    }[] | undefined;
}, {
    title?: string | undefined;
    description?: string | undefined;
    questions?: {
        optionsAnswer: {
            text: string;
            value: number;
            id?: string | undefined;
        }[];
        sound: string;
        id?: string | undefined;
        title?: string | undefined;
        description?: string | undefined;
    }[] | undefined;
}>;
export type CreateScreeningDTO = z.infer<typeof CreateScreeningSchema>;
export type UpdateScreeningDTO = z.infer<typeof UpdateScreeningSchema>;
//# sourceMappingURL=ScreeningDTO.d.ts.map