import { z } from 'zod';
import { OptionAnswerSchema } from './TinnitusQuestionnaireDTO';

const QuestionSchema = z.object({
  id: z.string().uuid().optional(),
  sound: z.string().min(1, 'El sonido es requerido'),
  title: z.string().optional(),
  description: z.string().optional(),
  optionsAnswer: z.array(OptionAnswerSchema).min(1, 'Debe tener al menos una opción'),
});

export const CreateScreeningSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  questions: z.array(QuestionSchema).min(1, 'Debe tener al menos una pregunta'),
});

export const UpdateScreeningSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  questions: z.array(QuestionSchema).optional(),
});

export type CreateScreeningDTO = z.infer<typeof CreateScreeningSchema>;
export type UpdateScreeningDTO = z.infer<typeof UpdateScreeningSchema>;
