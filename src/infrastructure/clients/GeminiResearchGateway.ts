import {
  IResearchAiGateway,
  ResearchAiInput,
  ResearchAiOutput,
} from '../../domain/ports/IResearchAiGateway';
import { Logger } from '../logger/Logger';

/**
 * Implementación del puerto de investigación con Google Gemini (REST).
 *
 * Usa la API key del usuario si se provee; de lo contrario recurre a
 * `GEMINI_API_KEY` del entorno. Si no hay clave o la llamada falla, devuelve
 * un resultado de respaldo redactado localmente para no bloquear el flujo.
 */
export class GeminiResearchGateway implements IResearchAiGateway {
  private readonly defaultModel: string;
  private readonly timeoutMs: number;

  constructor() {
    this.defaultModel = process.env.GEMINI_RESEARCH_MODEL?.trim() || 'gemini-2.0-flash';
    this.timeoutMs = Number(process.env.GEMINI_RESEARCH_TIMEOUT_MS ?? 30000);
  }

  async generate(input: ResearchAiInput): Promise<ResearchAiOutput> {
    const apiKey = (input.apiKey || process.env.GEMINI_API_KEY || '').trim();
    const model = (input.model || this.defaultModel).trim();

    if (!apiKey) {
      Logger.warning('Sin API key de Gemini; usando resultado de respaldo', {
        title: input.title,
      });
      return this.fallback(input, model);
    }

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
        model,
      )}:generateContent?key=${encodeURIComponent(apiKey)}`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: this.buildPrompt(input) }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            responseMimeType: 'application/json',
          },
        }),
        signal: controller.signal,
      }).finally(() => clearTimeout(timeoutId));

      if (!response.ok) {
        const body = await response.text();
        Logger.danger('Gemini respondió con error', { status: response.status, body });
        return this.fallback(input, model);
      }

      const json: any = await response.json();
      const text: string =
        json?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

      const parsed = this.parseJson(text);
      if (!parsed) {
        return {
          content: text.trim() || this.fallbackContent(input),
          psychologicalMessage: this.fallbackMessage(input),
          model,
        };
      }

      return {
        content: (parsed.content || '').toString().trim() || this.fallbackContent(input),
        psychologicalMessage:
          (parsed.psychologicalMessage || '').toString().trim() ||
          this.fallbackMessage(input),
        model,
      };
    } catch (error) {
      Logger.danger('Error al invocar Gemini para investigación', {
        error: (error as Error).message,
      });
      return this.fallback(input, model);
    }
  }

  private buildPrompt(input: ResearchAiInput): string {
    const kind = input.eventType === 'research' ? 'investigación' : 'tarea';

    return [
      'Eres un asistente clínico experto en salud auditiva y, a la vez, un',
      'acompañante con formación en psicología.',
      `Analiza e investiga la siguiente ${kind} del usuario y entrega hallazgos útiles.`,
      '',
      `Título: ${input.title}`,
      `Detalle: ${input.prompt}`,
      '',
      'Responde EXCLUSIVAMENTE con un objeto JSON válido con esta forma:',
      '{',
      '  "content": "<resultado de la investigación en Markdown: resumen, hallazgos clave, recomendaciones y próximos pasos>",',
      '  "psychologicalMessage": "<mensaje breve (2-4 frases) con enfoque psicológico: tono cálido, validante y motivador; reduce la sobrecarga, normaliza emociones y refuerza la autoeficacia del usuario al revisar estos resultados>"',
      '}',
      '',
      'Escribe en español. No incluyas texto fuera del JSON.',
    ].join('\n');
  }

  private parseJson(text: string): { content?: string; psychologicalMessage?: string } | null {
    const trimmed = (text || '').trim();
    if (!trimmed) return null;
    try {
      return JSON.parse(trimmed);
    } catch (_) {
      const start = trimmed.indexOf('{');
      const end = trimmed.lastIndexOf('}');
      if (start >= 0 && end > start) {
        try {
          return JSON.parse(trimmed.slice(start, end + 1));
        } catch (_) {
          return null;
        }
      }
      return null;
    }
  }

  private fallback(input: ResearchAiInput, model: string): ResearchAiOutput {
    return {
      content: this.fallbackContent(input),
      psychologicalMessage: this.fallbackMessage(input),
      model,
    };
  }

  private fallbackContent(input: ResearchAiInput): string {
    const kind = input.eventType === 'research' ? 'investigación' : 'tarea';
    return [
      `## Resultados de la ${kind}: ${input.title}`,
      '',
      'No fue posible completar el análisis con IA en este momento, pero aquí',
      'tienes una guía inicial basada en la información proporcionada:',
      '',
      `> ${input.prompt}`,
      '',
      '**Próximos pasos sugeridos:**',
      '- Revisa la información registrada y complétala si falta algún detalle.',
      '- Configura tu API key de IA para obtener un análisis más profundo.',
      '- Vuelve a ejecutar la investigación cuando el servicio esté disponible.',
    ].join('\n');
  }

  private fallbackMessage(input: ResearchAiInput): string {
    return [
      'Has dado un paso valioso al dejar que la IA acompañe tu',
      `${input.eventType === 'research' ? 'investigación' : 'tarea'}.`,
      'Revisar resultados poco a poco está bien: no tienes que asimilarlo todo de una vez.',
      'Confía en tu ritmo; cada avance, por pequeño que parezca, cuenta.',
    ].join(' ');
  }
}
