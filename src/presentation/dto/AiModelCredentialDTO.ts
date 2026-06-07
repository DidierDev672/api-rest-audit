import { z } from 'zod';

const providerEnum = z.enum(['gemini', 'openai', 'anthropic', 'other'], {
  errorMap: () => ({
    message: 'provider debe ser uno de: gemini, openai, anthropic, other',
  }),
});

const optionalTrimmedString = z
  .string()
  .trim()
  .min(1)
  .nullable()
  .optional();

export const CreateAiModelCredentialSchema = z
  .object({
    owner_id: z.string().trim().min(1, 'owner_id es requerido'),
    provider: providerEnum,
    label: optionalTrimmedString,
    model_name: optionalTrimmedString,
    api_key: z.string().trim().min(1, 'api_key es requerido'),
    base_url: z
      .string()
      .trim()
      .url('base_url debe ser una URL válida')
      .nullable()
      .optional(),
    is_default: z.boolean().optional().default(false),
  })
  .superRefine((data, ctx) => {
    if (data.provider === 'other') {
      if (!data.base_url) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['base_url'],
          message: 'base_url es requerido cuando provider es "other"',
        });
      }
      if (!data.label) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['label'],
          message: 'label es requerido cuando provider es "other"',
        });
      }
    }
  });

export const UpdateAiModelCredentialSchema = z.object({
  provider: providerEnum.optional(),
  label: optionalTrimmedString,
  model_name: optionalTrimmedString,
  api_key: z.string().trim().min(1, 'api_key no puede estar vacío').optional(),
  base_url: z
    .string()
    .trim()
    .url('base_url debe ser una URL válida')
    .nullable()
    .optional(),
  is_default: z.boolean().optional(),
  is_active: z.boolean().optional(),
});

export type CreateAiModelCredentialDTO = z.infer<
  typeof CreateAiModelCredentialSchema
>;
export type UpdateAiModelCredentialDTO = z.infer<
  typeof UpdateAiModelCredentialSchema
>;
