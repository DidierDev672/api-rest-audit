import { AiResearchEventType } from '../entities/AiResearchAssignmentEntity';

export interface ResearchAiInput {
  title: string;
  prompt: string;
  eventType: AiResearchEventType;
  /** Clave del proveedor de IA del usuario; si falta se usa la de entorno. */
  apiKey?: string | null;
  model?: string | null;
}

export interface ResearchAiOutput {
  /** Resultado de la investigación (Markdown). */
  content: string;
  /** Mensaje de acompañamiento con enfoque psicológico. */
  psychologicalMessage: string;
  /** Modelo realmente utilizado. */
  model: string;
}

/**
 * Puerto para delegar la investigación a un proveedor de IA.
 */
export interface IResearchAiGateway {
  generate(input: ResearchAiInput): Promise<ResearchAiOutput>;
}
