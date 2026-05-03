import { z } from 'zod';
export declare const CreateRelaxingSoundSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    sound: z.ZodString;
}, "strip", z.ZodTypeAny, {
    description: string;
    title: string;
    sound: string;
}, {
    description: string;
    title: string;
    sound: string;
}>;
export declare const UpdateRelaxingSoundSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    sound: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    description?: string | undefined;
    title?: string | undefined;
    sound?: string | undefined;
}, {
    description?: string | undefined;
    title?: string | undefined;
    sound?: string | undefined;
}>;
export declare const CreateRelaxingSoundDTO: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    sound: z.ZodString;
}, "strip", z.ZodTypeAny, {
    description: string;
    title: string;
    sound: string;
}, {
    description: string;
    title: string;
    sound: string;
}>;
export declare const UpdateRelaxingSoundDTO: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    sound: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    description?: string | undefined;
    title?: string | undefined;
    sound?: string | undefined;
}, {
    description?: string | undefined;
    title?: string | undefined;
    sound?: string | undefined;
}>;
export type CreateRelaxingSoundDTO = z.infer<typeof CreateRelaxingSoundSchema>;
export type UpdateRelaxingSoundDTO = z.infer<typeof UpdateRelaxingSoundSchema>;
//# sourceMappingURL=RelaxingSoundDTO.d.ts.map