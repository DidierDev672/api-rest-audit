import { z } from 'zod';

export const OptionAnswerSchema = z.object({
  id: z.string().optional(),
  text: z.string().min(1, 'El texto de la opción es requerido'),
  value: z.number(),
});

export const QuestionSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'El título de la pregunta es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  optionsAnswer: z.array(OptionAnswerSchema).min(1, 'Debe tener al menos una opción'),
});

export const CreateTinnitusQuestionnaireSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  questions: z.array(QuestionSchema).min(1, 'Debe tener al menos una pregunta'),
});

export const UpdateTinnitusQuestionnaireSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  questions: z.array(QuestionSchema).optional(),
});

export const CreateTinnitusQuestionnaireDTO = CreateTinnitusQuestionnaireSchema;
export const UpdateTinnitusQuestionnaireDTO = UpdateTinnitusQuestionnaireSchema;

export type CreateTinnitusQuestionnaireDTO = z.infer<typeof CreateTinnitusQuestionnaireSchema>;
export type UpdateTinnitusQuestionnaireDTO = z.infer<typeof UpdateTinnitusQuestionnaireSchema>;
