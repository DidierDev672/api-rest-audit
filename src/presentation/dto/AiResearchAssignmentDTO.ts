import { z } from 'zod';

const dateString = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'La fecha debe tener formato YYYY-MM-DD');

export const AssignAiResearchSchema = z
  .object({
    owner_id: z.string().trim().min(1, 'owner_id es requerido'),
    calendar_event_id: z.string().trim().min(1).nullable().optional(),
    research_id: z.string().trim().min(1).nullable().optional(),
    event_type: z.enum(['task', 'research'], {
      errorMap: () => ({ message: 'event_type debe ser "task" o "research"' }),
    }),
    title: z.string().trim().min(1, 'El título es requerido'),
    prompt: z.string().trim().min(1, 'El contenido a investigar es requerido'),
    start_date: dateString,
    end_date: dateString,
    recurrence: z.enum(['once', 'daily']).optional().default('once'),
    model: z.string().trim().min(1).nullable().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.end_date < data.start_date) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['end_date'],
        message: 'end_date no puede ser anterior a start_date',
      });
    }
  });

export const UpdateAiResearchAssignmentSchema = z.object({
  continue_delivery: z.boolean().optional(),
  status: z.enum(['pending', 'paused', 'cancelled']).optional(),
  recurrence: z.enum(['once', 'daily']).optional(),
  end_date: dateString.optional(),
});

export type AssignAiResearchDTO = z.infer<typeof AssignAiResearchSchema>;
export type UpdateAiResearchAssignmentDTO = z.infer<
  typeof UpdateAiResearchAssignmentSchema
>;
