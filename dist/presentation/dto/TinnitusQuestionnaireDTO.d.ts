import { z } from 'zod';
export declare const OptionAnswerSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    text: z.ZodString;
    value: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    value: number;
    text: string;
    id?: string | undefined;
}, {
    value: number;
    text: string;
    id?: string | undefined;
}>;
export declare const QuestionSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    description: z.ZodString;
    optionsAnswer: z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        text: z.ZodString;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
        text: string;
        id?: string | undefined;
    }, {
        value: number;
        text: string;
        id?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    description: string;
    title: string;
    optionsAnswer: {
        value: number;
        text: string;
        id?: string | undefined;
    }[];
    id?: string | undefined;
}, {
    description: string;
    title: string;
    optionsAnswer: {
        value: number;
        text: string;
        id?: string | undefined;
    }[];
    id?: string | undefined;
}>;
export declare const CreateTinnitusQuestionnaireSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    questions: z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        description: z.ZodString;
        optionsAnswer: z.ZodArray<z.ZodObject<{
            id: z.ZodOptional<z.ZodString>;
            text: z.ZodString;
            value: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            value: number;
            text: string;
            id?: string | undefined;
        }, {
            value: number;
            text: string;
            id?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        description: string;
        title: string;
        optionsAnswer: {
            value: number;
            text: string;
            id?: string | undefined;
        }[];
        id?: string | undefined;
    }, {
        description: string;
        title: string;
        optionsAnswer: {
            value: number;
            text: string;
            id?: string | undefined;
        }[];
        id?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    description: string;
    title: string;
    questions: {
        description: string;
        title: string;
        optionsAnswer: {
            value: number;
            text: string;
            id?: string | undefined;
        }[];
        id?: string | undefined;
    }[];
}, {
    description: string;
    title: string;
    questions: {
        description: string;
        title: string;
        optionsAnswer: {
            value: number;
            text: string;
            id?: string | undefined;
        }[];
        id?: string | undefined;
    }[];
}>;
export declare const UpdateTinnitusQuestionnaireSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    questions: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        description: z.ZodString;
        optionsAnswer: z.ZodArray<z.ZodObject<{
            id: z.ZodOptional<z.ZodString>;
            text: z.ZodString;
            value: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            value: number;
            text: string;
            id?: string | undefined;
        }, {
            value: number;
            text: string;
            id?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        description: string;
        title: string;
        optionsAnswer: {
            value: number;
            text: string;
            id?: string | undefined;
        }[];
        id?: string | undefined;
    }, {
        description: string;
        title: string;
        optionsAnswer: {
            value: number;
            text: string;
            id?: string | undefined;
        }[];
        id?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    description?: string | undefined;
    questions?: {
        description: string;
        title: string;
        optionsAnswer: {
            value: number;
            text: string;
            id?: string | undefined;
        }[];
        id?: string | undefined;
    }[] | undefined;
}, {
    title?: string | undefined;
    description?: string | undefined;
    questions?: {
        description: string;
        title: string;
        optionsAnswer: {
            value: number;
            text: string;
            id?: string | undefined;
        }[];
        id?: string | undefined;
    }[] | undefined;
}>;
export declare const CreateTinnitusQuestionnaireDTO: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    questions: z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        description: z.ZodString;
        optionsAnswer: z.ZodArray<z.ZodObject<{
            id: z.ZodOptional<z.ZodString>;
            text: z.ZodString;
            value: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            value: number;
            text: string;
            id?: string | undefined;
        }, {
            value: number;
            text: string;
            id?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        description: string;
        title: string;
        optionsAnswer: {
            value: number;
            text: string;
            id?: string | undefined;
        }[];
        id?: string | undefined;
    }, {
        description: string;
        title: string;
        optionsAnswer: {
            value: number;
            text: string;
            id?: string | undefined;
        }[];
        id?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    description: string;
    title: string;
    questions: {
        description: string;
        title: string;
        optionsAnswer: {
            value: number;
            text: string;
            id?: string | undefined;
        }[];
        id?: string | undefined;
    }[];
}, {
    description: string;
    title: string;
    questions: {
        description: string;
        title: string;
        optionsAnswer: {
            value: number;
            text: string;
            id?: string | undefined;
        }[];
        id?: string | undefined;
    }[];
}>;
export declare const UpdateTinnitusQuestionnaireDTO: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    questions: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        description: z.ZodString;
        optionsAnswer: z.ZodArray<z.ZodObject<{
            id: z.ZodOptional<z.ZodString>;
            text: z.ZodString;
            value: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            value: number;
            text: string;
            id?: string | undefined;
        }, {
            value: number;
            text: string;
            id?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        description: string;
        title: string;
        optionsAnswer: {
            value: number;
            text: string;
            id?: string | undefined;
        }[];
        id?: string | undefined;
    }, {
        description: string;
        title: string;
        optionsAnswer: {
            value: number;
            text: string;
            id?: string | undefined;
        }[];
        id?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    description?: string | undefined;
    questions?: {
        description: string;
        title: string;
        optionsAnswer: {
            value: number;
            text: string;
            id?: string | undefined;
        }[];
        id?: string | undefined;
    }[] | undefined;
}, {
    title?: string | undefined;
    description?: string | undefined;
    questions?: {
        description: string;
        title: string;
        optionsAnswer: {
            value: number;
            text: string;
            id?: string | undefined;
        }[];
        id?: string | undefined;
    }[] | undefined;
}>;
export type CreateTinnitusQuestionnaireDTO = z.infer<typeof CreateTinnitusQuestionnaireSchema>;
export type UpdateTinnitusQuestionnaireDTO = z.infer<typeof UpdateTinnitusQuestionnaireSchema>;
//# sourceMappingURL=TinnitusQuestionnaireDTO.d.ts.map