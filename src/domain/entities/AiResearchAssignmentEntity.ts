/**
 * Estados de una asignación de investigación a la IA.
 *
 * - `pending`     → en cola, esperando que el programador la ejecute
 * - `processing`  → la IA la está ejecutando ahora mismo
 * - `completed`   → terminó (sin más ejecuciones programadas)
 * - `failed`      → falló la última ejecución
 * - `paused`      → el usuario pidió dejar de recibir resultados
 * - `cancelled`   → cancelada / eliminada lógicamente
 */
export type AiResearchAssignmentStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'paused'
  | 'cancelled';

export const AI_RESEARCH_ASSIGNMENT_STATUSES: AiResearchAssignmentStatus[] = [
  'pending',
  'processing',
  'completed',
  'failed',
  'paused',
  'cancelled',
];

/** Frecuencia con la que la IA produce resultados dentro del rango de fechas. */
export type AiResearchRecurrence = 'once' | 'daily';

export type AiResearchEventType = 'task' | 'research';

/**
 * Una tarea o investigación del calendario delegada a la IA para que la
 * analice/investigue durante un rango de fechas determinado.
 */
export interface AiResearchAssignment {
  id: string;
  ownerId: string;
  calendarEventId: string | null;
  researchId: string | null;
  eventType: AiResearchEventType;
  title: string;
  prompt: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  recurrence: AiResearchRecurrence;
  status: AiResearchAssignmentStatus;
  continueDelivery: boolean;
  model: string | null;
  nextRunAt: Date | null;
  lastRunAt: Date | null;
  completedAt: Date | null;
  runsCount: number;
  lastError: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Resultado producido por la IA para una asignación. La `psychologicalMessage`
 * es un mensaje redactado con enfoque psicológico para acompañar al usuario.
 */
export interface AiResearchResult {
  id: string;
  assignmentId: string;
  ownerId: string;
  title: string;
  content: string;
  psychologicalMessage: string;
  model: string | null;
  seen: boolean;
  createdAt: Date;
}

export interface AiResearchAssignmentResponse {
  id: string;
  owner_id: string;
  calendar_event_id: string | null;
  research_id: string | null;
  event_type: AiResearchEventType;
  title: string;
  prompt: string;
  start_date: string;
  end_date: string;
  recurrence: AiResearchRecurrence;
  status: AiResearchAssignmentStatus;
  continue_delivery: boolean;
  model: string | null;
  next_run_at: string | null;
  last_run_at: string | null;
  completed_at: string | null;
  runs_count: number;
  last_error: string | null;
  created_at: string;
  updated_at: string;
}

export interface AiResearchResultResponse {
  id: string;
  assignment_id: string;
  owner_id: string;
  title: string;
  content: string;
  psychological_message: string;
  model: string | null;
  seen: boolean;
  created_at: string;
}

export function toAiResearchAssignmentResponse(
  a: AiResearchAssignment,
): AiResearchAssignmentResponse {
  return {
    id: a.id,
    owner_id: a.ownerId,
    calendar_event_id: a.calendarEventId,
    research_id: a.researchId,
    event_type: a.eventType,
    title: a.title,
    prompt: a.prompt,
    start_date: a.startDate,
    end_date: a.endDate,
    recurrence: a.recurrence,
    status: a.status,
    continue_delivery: a.continueDelivery,
    model: a.model,
    next_run_at: a.nextRunAt ? a.nextRunAt.toISOString() : null,
    last_run_at: a.lastRunAt ? a.lastRunAt.toISOString() : null,
    completed_at: a.completedAt ? a.completedAt.toISOString() : null,
    runs_count: a.runsCount,
    last_error: a.lastError,
    created_at: a.createdAt.toISOString(),
    updated_at: a.updatedAt.toISOString(),
  };
}

export function toAiResearchResultResponse(
  r: AiResearchResult,
): AiResearchResultResponse {
  return {
    id: r.id,
    assignment_id: r.assignmentId,
    owner_id: r.ownerId,
    title: r.title,
    content: r.content,
    psychological_message: r.psychologicalMessage,
    model: r.model,
    seen: r.seen,
    created_at: r.createdAt.toISOString(),
  };
}
