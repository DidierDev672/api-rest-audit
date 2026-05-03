import { z } from 'zod';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1, 'El contenido es requerido'),
  timestamp: z.string().datetime({ message: 'Fecha inválida en formato ISO-8601' }),
});

const SessionSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  originalDescription: z.string().optional(),
  messages: z.array(ChatMessageSchema).optional(),
  summary: z.string().optional(),
  tags: z.array(z.string()).optional(),
  createdAt: z.string().datetime({ message: 'Fecha inválida en formato ISO-8601' }).optional(),
  updatedAt: z.string().datetime({ message: 'Fecha inválida en formato ISO-8601' }).optional(),
});

const MetadataSchema = z.object({
  totalMessages: z.number().int().min(0).optional(),
  totalUserMessages: z.number().int().min(0).optional(),
  totalAssistantMessages: z.number().int().min(0).optional(),
  duration: z.number().int().min(0).optional(),
  aiModel: z.string().optional(),
});

export const CreateResearchChatSessionSchema = z.object({
  researchId: z.string().min(1, 'El ID de investigación es requerido'),
  session: SessionSchema,
  metadata: MetadataSchema.optional(),
});

export const CreateResearchChatSessionDTO = CreateResearchChatSessionSchema;
export type CreateResearchChatSessionDTO = z.infer<typeof CreateResearchChatSessionSchema>;