/**
 * Proveedores de modelos de IA soportados por la app móvil.
 *
 * - `gemini`     → Google Gemini
 * - `openai`     → OpenAI / Codex (GPT)
 * - `anthropic`  → Anthropic Claude
 * - `other`      → Proveedor personalizado (requiere baseUrl)
 */
export type AiModelProvider = 'gemini' | 'openai' | 'anthropic' | 'other';

export const AI_MODEL_PROVIDERS: AiModelProvider[] = [
  'gemini',
  'openai',
  'anthropic',
  'other',
];

/**
 * Credencial de un modelo de IA que un usuario configura desde la app móvil.
 *
 * La `apiKey` se guarda completa en base de datos pero NUNCA se devuelve íntegra
 * en las respuestas HTTP: se enmascara con {@link maskApiKey}.
 */
export interface AiModelCredential {
  id: string;
  ownerId: string;
  provider: AiModelProvider;
  label: string | null;
  modelName: string | null;
  apiKey: string;
  baseUrl: string | null;
  isDefault: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Forma segura para exponer una credencial al cliente (sin la clave en claro).
 */
export interface AiModelCredentialResponse {
  id: string;
  owner_id: string;
  provider: AiModelProvider;
  label: string | null;
  model_name: string | null;
  api_key_preview: string;
  has_api_key: boolean;
  base_url: string | null;
  is_default: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Información necesaria para configurar correctamente un proveedor.
 * Se devuelve cuando una prueba de modelo falla, para guiar al usuario.
 */
export interface AiModelProviderRequirements {
  provider: AiModelProvider;
  vendor: string;
  docs_url: string;
  key_format: string;
  needs_base_url: boolean;
  suggested_models: string[];
  notes: string[];
}

/**
 * Devuelve la guía de configuración para un proveedor (qué necesita su modelo).
 */
export function getProviderRequirements(
  provider: AiModelProvider,
): AiModelProviderRequirements {
  switch (provider) {
    case 'gemini':
      return {
        provider,
        vendor: 'Google',
        docs_url: 'https://aistudio.google.com/app/apikey',
        key_format: 'Empieza por "AIza" (clave de Google AI Studio).',
        needs_base_url: false,
        suggested_models: ['gemini-2.5-flash', 'gemini-2.5-pro', 'gemini-2.0-flash'],
        notes: [
          'Crea la API key en Google AI Studio.',
          'Habilita la API "Generative Language" en tu proyecto de Google.',
          'Verifica que la key no esté restringida por IP o referer.',
        ],
      };
    case 'openai':
      return {
        provider,
        vendor: 'OpenAI',
        docs_url: 'https://platform.openai.com/api-keys',
        key_format: 'Empieza por "sk-" (clave de plataforma OpenAI).',
        needs_base_url: false,
        suggested_models: ['gpt-4o', 'gpt-4o-mini', 'o3-mini', 'gpt-4.1'],
        notes: [
          'Genera la key en platform.openai.com/api-keys.',
          'Tu cuenta debe tener crédito o facturación activa.',
          'Si usas un proyecto, confirma que la key pertenece a ese proyecto.',
        ],
      };
    case 'anthropic':
      return {
        provider,
        vendor: 'Anthropic',
        docs_url: 'https://console.anthropic.com/settings/keys',
        key_format: 'Empieza por "sk-ant-" (clave de Anthropic Console).',
        needs_base_url: false,
        suggested_models: ['claude-3-5-sonnet', 'claude-3-5-haiku', 'claude-3-opus'],
        notes: [
          'Crea la key en console.anthropic.com.',
          'Tu organización debe tener saldo disponible.',
          'La key requiere el encabezado anthropic-version (lo añade el servidor).',
        ],
      };
    case 'other':
    default:
      return {
        provider: 'other',
        vendor: 'Personalizado',
        docs_url: '',
        key_format: 'Formato definido por tu proveedor.',
        needs_base_url: true,
        suggested_models: [],
        notes: [
          'Indica el endpoint base (base_url), p. ej. https://api.tu-proveedor.com/v1.',
          'El endpoint debería exponer una ruta compatible (p. ej. /models).',
          'La autenticación se envía como "Authorization: Bearer <api_key>".',
        ],
      };
  }
}

/**
 * Enmascara una clave dejando visibles solo los últimos 4 caracteres.
 * Ej: `sk-1234567890abcd` → `••••••abcd`
 */
export function maskApiKey(apiKey: string): string {
  const trimmed = (apiKey ?? '').trim();
  if (trimmed.length === 0) return '';
  if (trimmed.length <= 4) return '•'.repeat(trimmed.length);
  const visible = trimmed.slice(-4);
  return `${'•'.repeat(6)}${visible}`;
}

/**
 * Convierte la entidad interna en la respuesta pública enmascarando la clave.
 */
export function toAiModelCredentialResponse(
  credential: AiModelCredential,
): AiModelCredentialResponse {
  return {
    id: credential.id,
    owner_id: credential.ownerId,
    provider: credential.provider,
    label: credential.label,
    model_name: credential.modelName,
    api_key_preview: maskApiKey(credential.apiKey),
    has_api_key: (credential.apiKey ?? '').trim().length > 0,
    base_url: credential.baseUrl,
    is_default: credential.isDefault,
    is_active: credential.isActive,
    created_at: credential.createdAt.toISOString(),
    updated_at: credential.updatedAt.toISOString(),
  };
}
