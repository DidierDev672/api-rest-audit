import { z } from 'zod';

const nonEmptyText = z
  .string({
    required_error: 'El texto es requerido',
    invalid_type_error: 'El texto debe ser una cadena de caracteres',
  })
  .min(1, 'El texto no puede estar vacío')
  .refine((value) => value.trim().length > 0, {
    message: 'El texto no puede contener solo espacios en blanco',
  });

const geminiPartSchema = z
  .object({
    text: z.string().optional(),
    thoughtSignature: z.string().optional(),
  })
  .passthrough();

const geminiContentSchema = z
  .object({
    parts: z.array(geminiPartSchema).min(1, 'Se requiere al menos una parte en content.parts'),
    role: z.string().optional(),
  })
  .passthrough();

const geminiResponseSchema = z
  .object({
    content: geminiContentSchema,
    finishReason: z.string().optional(),
    index: z.number().optional(),
  })
  .passthrough();

export const N8nSendTextSchema = z.object({
  text: nonEmptyText,
  metadata: z.record(z.unknown()).optional(),
});

export const N8nReceiveTextSchema = z.object({
  text: nonEmptyText,
  metadata: z.record(z.unknown()).optional(),
});

export const N8nReceiveGeminiSchema = z.object({
  task: z.string().min(1, 'El campo task es requerido'),
  gemini_response: geminiResponseSchema,
  timestamp: z.string().optional(),
  filename: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const N8nMarkdownUploadSchema = z.object({
  filename: z.string().min(1, 'El nombre del archivo es requerido'),
  content: nonEmptyText,
  metadata: z.record(z.unknown()).optional(),
});

const n8nReceivePayloadSchema = z.union([
  N8nReceiveGeminiSchema,
  N8nMarkdownUploadSchema,
  N8nReceiveTextSchema,
]);

export const N8nReceivePayloadSchema = z.preprocess(
  (value) => {
    if (
      typeof value === 'object' &&
      value !== null &&
      'body' in value &&
      typeof (value as Record<string, unknown>).body === 'object' &&
      (value as Record<string, unknown>).body !== null
    ) {
      return (value as Record<string, unknown>).body;
    }

    return value;
  },
  n8nReceivePayloadSchema
);

export type N8nSendTextDTO = z.infer<typeof N8nSendTextSchema>;
export type N8nReceiveTextDTO = z.infer<typeof N8nReceiveTextSchema>;
export type N8nReceiveGeminiDTO = z.infer<typeof N8nReceiveGeminiSchema>;
export type N8nMarkdownUploadDTO = z.infer<typeof N8nMarkdownUploadSchema>;
export type N8nReceivePayloadDTO = z.infer<typeof N8nReceivePayloadSchema>;
