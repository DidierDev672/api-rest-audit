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
export type CreateInvestigacionDTO = z.infer<typeof CreateInvestigacionSchema>;
//# sourceMappingURL=InvestigacionDTO.d.ts.map