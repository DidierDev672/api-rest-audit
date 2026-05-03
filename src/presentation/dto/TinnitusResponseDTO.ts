import { z } from 'zod';

export const OptionAnswerResponseSchema = z.object({
  id: z.string().optional(),
  text: z.string().min(1, 'El texto de la opción es requerido'),
  value: z.number(),
});

export const AnswerSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  optionsAnswer: z.array(OptionAnswerResponseSchema).min(1, 'Debe tener al menos una opción de respuesta'),
});

export const CreateTinnitusResponseSchema = z.object({
  idPatient: z.string().min(1, 'El ID del paciente es requerido'),
  idTinnitusQuestionnaires: z.string().min(1, 'El ID del cuestionario de tinnitus es requerido'),
  answer: z.array(AnswerSchema).min(1, 'Debe tener al menos una respuesta'),
});

export const UpdateTinnitusResponseSchema = z.object({
  idPatient: z.string().min(1).optional(),
  idTinnitusQuestionnaires: z.string().min(1).optional(),
  answer: z.array(AnswerSchema).optional(),
});

export const CreateTinnitusResponseDTO = CreateTinnitusResponseSchema;
export const UpdateTinnitusResponseDTO = UpdateTinnitusResponseSchema;

export type CreateTinnitusResponseDTO = z.infer<typeof CreateTinnitusResponseSchema>;
export type UpdateTinnitusResponseDTO = z.infer<typeof UpdateTinnitusResponseSchema>;