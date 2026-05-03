import { z } from 'zod';
export declare const OptionAnswerResponseSchema: z.ZodObject<{
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
}>;
export declare const AnswerSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    description: z.ZodString;
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
    description: string;
    title: string;
    optionsAnswer: {
        text: string;
        value: number;
        id?: string | undefined;
    }[];
    id?: string | undefined;
}, {
    description: string;
    title: string;
    optionsAnswer: {
        text: string;
        value: number;
        id?: string | undefined;
    }[];
    id?: string | undefined;
}>;
export declare const CreateTinnitusResponseSchema: z.ZodObject<{
    idPatient: z.ZodString;
    idTinnitusQuestionnaires: z.ZodString;
    answer: z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        description: z.ZodString;
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
        description: string;
        title: string;
        optionsAnswer: {
            text: string;
            value: number;
            id?: string | undefined;
        }[];
        id?: string | undefined;
    }, {
        description: string;
        title: string;
        optionsAnswer: {
            text: string;
            value: number;
            id?: string | undefined;
        }[];
        id?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    idPatient: string;
    idTinnitusQuestionnaires: string;
    answer: {
        description: string;
        title: string;
        optionsAnswer: {
            text: string;
            value: number;
            id?: string | undefined;
        }[];
        id?: string | undefined;
    }[];
}, {
    idPatient: string;
    idTinnitusQuestionnaires: string;
    answer: {
        description: string;
        title: string;
        optionsAnswer: {
            text: string;
            value: number;
            id?: string | undefined;
        }[];
        id?: string | undefined;
    }[];
}>;
export declare const UpdateTinnitusResponseSchema: z.ZodObject<{
    idPatient: z.ZodOptional<z.ZodString>;
    idTinnitusQuestionnaires: z.ZodOptional<z.ZodString>;
    answer: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        description: z.ZodString;
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
        description: string;
        title: string;
        optionsAnswer: {
            text: string;
            value: number;
            id?: string | undefined;
        }[];
        id?: string | undefined;
    }, {
        description: string;
        title: string;
        optionsAnswer: {
            text: string;
            value: number;
            id?: string | undefined;
        }[];
        id?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    idPatient?: string | undefined;
    idTinnitusQuestionnaires?: string | undefined;
    answer?: {
        description: string;
        title: string;
        optionsAnswer: {
            text: string;
            value: number;
            id?: string | undefined;
        }[];
        id?: string | undefined;
    }[] | undefined;
}, {
    idPatient?: string | undefined;
    idTinnitusQuestionnaires?: string | undefined;
    answer?: {
        description: string;
        title: string;
        optionsAnswer: {
            text: string;
            value: number;
            id?: string | undefined;
        }[];
        id?: string | undefined;
    }[] | undefined;
}>;
export declare const CreateTinnitusResponseDTO: z.ZodObject<{
    idPatient: z.ZodString;
    idTinnitusQuestionnaires: z.ZodString;
    answer: z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        description: z.ZodString;
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
        description: string;
        title: string;
        optionsAnswer: {
            text: string;
            value: number;
            id?: string | undefined;
        }[];
        id?: string | undefined;
    }, {
        description: string;
        title: string;
        optionsAnswer: {
            text: string;
            value: number;
            id?: string | undefined;
        }[];
        id?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    idPatient: string;
    idTinnitusQuestionnaires: string;
    answer: {
        description: string;
        title: string;
        optionsAnswer: {
            text: string;
            value: number;
            id?: string | undefined;
        }[];
        id?: string | undefined;
    }[];
}, {
    idPatient: string;
    idTinnitusQuestionnaires: string;
    answer: {
        description: string;
        title: string;
        optionsAnswer: {
            text: string;
            value: number;
            id?: string | undefined;
        }[];
        id?: string | undefined;
    }[];
}>;
export declare const UpdateTinnitusResponseDTO: z.ZodObject<{
    idPatient: z.ZodOptional<z.ZodString>;
    idTinnitusQuestionnaires: z.ZodOptional<z.ZodString>;
    answer: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        description: z.ZodString;
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
        description: string;
        title: string;
        optionsAnswer: {
            text: string;
            value: number;
            id?: string | undefined;
        }[];
        id?: string | undefined;
    }, {
        description: string;
        title: string;
        optionsAnswer: {
            text: string;
            value: number;
            id?: string | undefined;
        }[];
        id?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    idPatient?: string | undefined;
    idTinnitusQuestionnaires?: string | undefined;
    answer?: {
        description: string;
        title: string;
        optionsAnswer: {
            text: string;
            value: number;
            id?: string | undefined;
        }[];
        id?: string | undefined;
    }[] | undefined;
}, {
    idPatient?: string | undefined;
    idTinnitusQuestionnaires?: string | undefined;
    answer?: {
        description: string;
        title: string;
        optionsAnswer: {
            text: string;
            value: number;
            id?: string | undefined;
        }[];
        id?: string | undefined;
    }[] | undefined;
}>;
export type CreateTinnitusResponseDTO = z.infer<typeof CreateTinnitusResponseSchema>;
export type UpdateTinnitusResponseDTO = z.infer<typeof UpdateTinnitusResponseSchema>;
//# sourceMappingURL=TinnitusResponseDTO.d.ts.map