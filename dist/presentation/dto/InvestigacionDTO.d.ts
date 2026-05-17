import { z } from 'zod';
export declare const CreateInvestigacionSchema: z.ZodObject<{
    id_resource: z.ZodString;
    content_resource: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id_resource: string;
    content_resource: string;
}, {
    id_resource: string;
    content_resource: string;
}>;
export declare const UpdateInvestigacionSchema: z.ZodObject<{
    content_resource: z.ZodString;
}, "strip", z.ZodTypeAny, {
    content_resource: string;
}, {
    content_resource: string;
}>;
export declare const CreateInvestigacionDTO: z.ZodObject<{
    id_resource: z.ZodString;
    content_resource: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id_resource: string;
    content_resource: string;
}, {
    id_resource: string;
    content_resource: string;
}>;
export declare const UpdateInvestigacionDTO: z.ZodObject<{
    content_resource: z.ZodString;
}, "strip", z.ZodTypeAny, {
    content_resource: string;
}, {
    content_resource: string;
}>;
export type CreateInvestigacionDTO = z.infer<typeof CreateInvestigacionSchema>;
export type UpdateInvestigacionDTO = z.infer<typeof UpdateInvestigacionSchema>;
//# sourceMappingURL=InvestigacionDTO.d.ts.map