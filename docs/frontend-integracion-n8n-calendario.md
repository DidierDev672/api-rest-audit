# Guía de integración en el frontend

Documentación para consumir desde el cliente (Vue, React, etc.) los endpoints de **integración N8N** y de **tareas programadas / notificaciones del calendario** de la API RECS (Auditory API).

---

## Tabla de contenidos

1. [Configuración inicial](#1-configuración-inicial)
2. [Cliente HTTP base](#2-cliente-http-base)
3. [Integración N8N](#3-integración-n8n)
4. [Calendario: eventos (contexto)](#4-calendario-eventos-contexto)
5. [Tareas programadas y notificaciones](#5-tareas-programadas-y-notificaciones)
6. [Flujo recomendado en la UI](#6-flujo-recomendado-en-la-ui)
7. [Tipos TypeScript](#7-tipos-typescript)
8. [Errores comunes](#8-errores-comunes)

---

## 1. Configuración inicial

### 1.1 URL base

Define la URL de la API en variables de entorno del frontend:

```env
# .env.development
VITE_API_BASE_URL=http://localhost:3000

# .env.production
VITE_API_BASE_URL=https://tu-dominio.com
```

Todas las rutas documentadas usan el prefijo:

```
{VITE_API_BASE_URL}/api/v1
```

### 1.2 Comprobar que la API responde

```http
GET /health
```

Respuesta esperada:

```json
{
  "status": "OK",
  "message": "Auditory API is running"
}
```

### 1.3 Headers por defecto

| Header | Cuándo usarlo |
|--------|----------------|
| `Content-Type: application/json` | En todas las peticiones con body JSON |
| `X-API-KEY` o `Authorization: Bearer <token>` | Solo en rutas protegidas por webhook (`/integrations/n8n/*`, `/calendar-scheduled-tasks/process-due`) si el backend tiene configurado `N8N_API_KEY` o `N8N_WEBHOOK_SECRET` |

> Las rutas de calendario y tareas programadas **no exigen autenticación** hoy. El frontend puede llamarlas directamente. Si en producción añades `authMiddleware`, deberás enviar el token del usuario.

---

## 2. Cliente HTTP base

### Paso 1 — Crear el cliente

Ejemplo con `fetch` (funciona en Vue 3, React, etc.):

```typescript
// src/api/httpClient.ts

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

type RequestOptions = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
};

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = 'GET', body, headers = {} } = options;

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      typeof data.error === 'string'
        ? data.error
        : data.error?.message ?? `Error HTTP ${response.status}`;
    throw new Error(message);
  }

  return data as T;
}
```

### Paso 2 — Módulos por dominio

Organiza los servicios así:

```
src/api/
  httpClient.ts
  n8nApi.ts
  calendarEventsApi.ts
  calendarScheduledTasksApi.ts
```

---

## 3. Integración N8N

Base path: `/api/v1/integrations/n8n`

### Resumen de endpoints

| Método | Ruta | Uso en frontend |
|--------|------|-----------------|
| `POST` | `/send` | Enviar texto a N8N **o** recibir markdown de Gemini (si el body trae `gemini_response`) |
| `POST` | `/receive` | Recibir y guardar markdown desde N8N / Gemini |
| `POST` | `/markdown/upload` | Igual que `/receive` (alias) |

---

### 3.1 Enviar texto a N8N (saliente)

El frontend envía un texto; la API lo reenvía al webhook de N8N y devuelve la respuesta.

```http
POST /api/v1/integrations/n8n/send
Content-Type: application/json

{
  "text": "Analiza este síntoma auditivo",
  "metadata": {
    "patientId": "abc-123",
    "source": "frontend"
  }
}
```

**Respuesta 200:**

```json
{
  "success": true,
  "data": {
    "text": "Respuesta procesada por N8N",
    "metadata": {},
    "exchangeId": "uuid-del-intercambio",
    "webhookLogId": "uuid-del-log"
  }
}
```

> `exchangeId` y `webhookLogId` se guardan en Supabase (`n8n_text_exchanges` y `n8n_webhook_logs`).

**Servicio frontend:**

```typescript
// src/api/n8nApi.ts
import { apiRequest } from './httpClient';

export function sendTextToN8n(payload: {
  text: string;
  metadata?: Record<string, unknown>;
}) {
  return apiRequest<{ success: boolean; data: { text: string; metadata?: Record<string, unknown> } }>(
    '/api/v1/integrations/n8n/send',
    { method: 'POST', body: payload }
  );
}
```

---

### 3.2 Recibir markdown desde Gemini / N8N (entrante)

Usa esta forma cuando el flujo de N8N (o tu formulario) devuelve la estructura de Gemini:

```json
{
  "task": "Descripción de la tarea o documento",
  "gemini_response": {
    "content": {
      "parts": [
        {
          "text": "# Título\nContenido markdown generado..."
        }
      ],
      "role": "model"
    },
    "finishReason": "STOP",
    "index": 0
  },
  "timestamp": "2026-05-18T10:59:06.932-05:00",
  "filename": "mi-documento.md",
  "metadata": {
    "author": "n8n-bot",
    "category": "documentacion"
  }
}
```

También se acepta el envoltorio con `body` (como lo muestra el nodo HTTP de n8n):

```json
{
  "body": {
    "task": "...",
    "gemini_response": { ... }
  }
}
```

**Petición:**

```http
POST /api/v1/integrations/n8n/receive
Content-Type: application/json

{ ... payload anterior ... }
```

**Respuesta 200:**

```json
{
  "success": true,
  "data": {
    "filename": "descripcion-de-la-tarea-2026-05-18T10-59-06.md",
    "path": "D:\\Vue\\auditory-api\\storage\\n8n-markdown\\...",
    "contentLength": 1234,
    "task": "Descripción de la tarea...",
    "timestamp": "2026-05-18T10:59:06.932-05:00",
    "metadata": {
      "finishReason": "STOP",
      "geminiRole": "model"
    }
  }
}
```

**Servicio frontend:**

```typescript
export type N8nGeminiPayload = {
  task: string;
  gemini_response: {
    content: {
      parts: Array<{ text?: string; thoughtSignature?: string }>;
      role?: string;
    };
    finishReason?: string;
    index?: number;
  };
  timestamp?: string;
  filename?: string;
  metadata?: Record<string, unknown>;
};

export function uploadMarkdownFromGemini(payload: N8nGeminiPayload) {
  return apiRequest<{
    success: boolean;
    data: {
      filename: string;
      path: string;
      contentLength: number;
      task?: string;
      timestamp?: string;
      metadata?: Record<string, unknown>;
    };
  }>('/api/v1/integrations/n8n/receive', {
    method: 'POST',
    body: payload,
  });
}
```

---

### 3.3 Subida directa de markdown (sin Gemini)

Formato simple cuando ya tienes el contenido en el frontend:

```http
POST /api/v1/integrations/n8n/markdown/upload
Content-Type: application/json

{
  "filename": "guia-implementacion.md",
  "content": "# Guía\n\nContenido...",
  "metadata": {
    "author": "frontend",
    "category": "documentacion"
  }
}
```

Misma respuesta que en [3.2](#32-recibir-markdown-desde-gemini--n8n-entrante).

---

### 3.4 Paso a paso N8N en el frontend

| Paso | Acción |
|------|--------|
| 1 | Crear pantalla o botón “Enviar a N8N” que llame a `sendTextToN8n({ text, metadata })`. |
| 2 | Mostrar `data.text` como resultado al usuario. |
| 3 | Si recibes respuesta de Gemini en el cliente, mapear a `N8nGeminiPayload` y llamar a `uploadMarkdownFromGemini`. |
| 4 | Mostrar `data.filename` y confirmación de guardado. |
| 5 | (Opcional) Si usas la misma URL `/send` con body Gemini, la API redirige internamente al flujo de recepción; preferible usar `/receive` en el frontend para mayor claridad. |

---

## 4. Calendario: eventos (contexto)

Base path: `/api/v1/calendar-events`

Necesario para crear eventos y luego programar recordatorios.

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/` | Listar eventos (`?from=YYYY-MM-DD&to=YYYY-MM-DD`) |
| `GET` | `/:id` | Detalle de un evento |
| `POST` | `/` | Crear evento |
| `PATCH` | `/:id` | Actualizar evento |
| `DELETE` | `/:id` | Eliminar evento (cancela tareas `pending` del evento) |

**Crear evento:**

```json
{
  "type": "task",
  "title": "Revisión de paciente",
  "description": "Seguimiento mensual",
  "startDate": "2026-05-20",
  "endDate": "2026-05-20",
  "startTime": "09:00",
  "endTime": "10:00",
  "researchId": null
}
```

**Listar (respuesta simplificada):**

```json
{
  "researchList": [],
  "events": [
    {
      "id": "uuid",
      "type": "task",
      "title": "...",
      "startDate": "2026-05-20",
      "date": "2026-05-20",
      "hasAiAnalysis": false
    }
  ],
  "meta": { "from": "2026-05-01", "to": "2026-05-31" }
}
```

---

## 5. Tareas programadas y notificaciones

Base path: `/api/v1/calendar-scheduled-tasks`

### 5.1 Resumen de endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/` | Listar tareas |
| `GET` | `/:id` | Detalle de tarea |
| `POST` | `/` | Crear tarea programada |
| `PATCH` | `/:id` | Actualizar / cancelar |
| `DELETE` | `/:id` | Eliminar tarea |
| `GET` | `/notifications` | Historial de notificaciones |
| `GET` | `/notifications/:id` | Detalle de notificación |
| `POST` | `/process-due` | Procesar tareas vencidas (uso interno / n8n) |

**Anidadas en eventos:**

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/v1/calendar-events/:eventId/scheduled-tasks` | Tareas de un evento |
| `POST` | `/api/v1/calendar-events/:eventId/scheduled-tasks` | Crear recordatorio para un evento |

---

### 5.2 Crear recordatorio (recomendado: 15 min antes)

```http
POST /api/v1/calendar-events/{eventId}/scheduled-tasks
Content-Type: application/json

{
  "reminderMinutesBefore": 15,
  "channel": "in_app",
  "message": "Tu evento comienza en 15 minutos"
}
```

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `reminderMinutesBefore` | number | Sí* | Minutos antes del inicio del evento (0–10080) |
| `scheduledAt` | string ISO 8601 | Sí* | Fecha/hora exacta alternativa |
| `title` | string | No | Si se omite, se usa el título del evento |
| `message` | string | No | Texto de la notificación |
| `channel` | `in_app` \| `webhook` \| `n8n` | No | Default: `in_app` |
| `metadata` | object | No | Datos extra |

\* Debes enviar **uno** de: `reminderMinutesBefore` o `scheduledAt`.

**Respuesta 201 (ejemplo):**

```json
{
  "id": "uuid",
  "calendarEventId": "uuid-evento",
  "title": "Recordatorio: Revisión de paciente",
  "message": "Tu evento comienza en 15 minutos",
  "scheduledAt": "2026-05-20T08:45:00.000Z",
  "status": "pending",
  "channel": "in_app",
  "reminderMinutesBefore": 15,
  "metadata": {},
  "sentAt": null,
  "lastError": null,
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

### 5.3 Listar tareas

```http
GET /api/v1/calendar-scheduled-tasks?calendarEventId={uuid}&status=pending&from=2026-05-01&to=2026-05-31
```

**Respuesta:**

```json
{
  "tasks": [ /* array de tareas */ ],
  "meta": { "count": 3 }
}
```

**Estados posibles (`status`):**

| Valor | Significado en UI |
|-------|-------------------|
| `pending` | Programada, aún no enviada |
| `processing` | Enviándose |
| `sent` | Notificación entregada |
| `failed` | Error al enviar |
| `cancelled` | Cancelada |

---

### 5.4 Actualizar o cancelar

```http
PATCH /api/v1/calendar-scheduled-tasks/{id}
Content-Type: application/json

{
  "status": "cancelled"
}
```

También puedes reprogramar:

```json
{
  "scheduledAt": "2026-05-21T14:00:00-05:00",
  "message": "Recordatorio actualizado"
}
```

> No se puede modificar una tarea con `status: "sent"`.

---

### 5.5 Listar notificaciones (historial)

```http
GET /api/v1/calendar-scheduled-tasks/notifications?calendarEventId={uuid}&from=2026-05-01&to=2026-05-31
```

**Respuesta:**

```json
{
  "notifications": [
    {
      "id": "uuid",
      "scheduledTaskId": "uuid",
      "calendarEventId": "uuid",
      "title": "Recordatorio: ...",
      "message": "...",
      "channel": "in_app",
      "status": "delivered",
      "payload": {},
      "deliveredAt": "...",
      "createdAt": "..."
    }
  ],
  "meta": { "count": 1 }
}
```

Usa esto para un panel de “Notificaciones recientes” o badge en el calendario.

---

### 5.6 Servicio frontend completo

```typescript
// src/api/calendarScheduledTasksApi.ts
import { apiRequest } from './httpClient';

export type ScheduledTaskStatus =
  | 'pending'
  | 'processing'
  | 'sent'
  | 'failed'
  | 'cancelled';

export type NotificationChannel = 'in_app' | 'webhook' | 'n8n';

export interface CalendarScheduledTask {
  id: string;
  calendarEventId: string | null;
  title: string;
  message: string;
  scheduledAt: string;
  status: ScheduledTaskStatus;
  channel: NotificationChannel;
  reminderMinutesBefore: number | null;
  metadata: Record<string, unknown>;
  sentAt: string | null;
  lastError: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CalendarNotification {
  id: string;
  scheduledTaskId: string | null;
  calendarEventId: string | null;
  title: string;
  message: string;
  channel: NotificationChannel;
  status: 'delivered' | 'failed';
  payload: Record<string, unknown>;
  deliveredAt: string;
  createdAt: string;
}

const BASE = '/api/v1/calendar-scheduled-tasks';

export const calendarScheduledTasksApi = {
  list(params?: {
    calendarEventId?: string;
    status?: ScheduledTaskStatus;
    from?: string;
    to?: string;
  }) {
    const query = new URLSearchParams(
      Object.entries(params ?? {}).filter(([, v]) => v != null) as [string, string][]
    );
    const qs = query.toString();
    return apiRequest<{ tasks: CalendarScheduledTask[]; meta: { count: number } }>(
      `${BASE}${qs ? `?${qs}` : ''}`
    );
  },

  getById(id: string) {
    return apiRequest<CalendarScheduledTask>(`${BASE}/${id}`);
  },

  create(payload: {
    calendarEventId?: string | null;
    title?: string;
    message?: string;
    scheduledAt?: string;
    reminderMinutesBefore?: number;
    channel?: NotificationChannel;
    metadata?: Record<string, unknown>;
  }) {
    return apiRequest<CalendarScheduledTask>(BASE, {
      method: 'POST',
      body: payload,
    });
  },

  createForEvent(
    eventId: string,
    payload: Omit<Parameters<typeof calendarScheduledTasksApi.create>[0], 'calendarEventId'>
  ) {
    return apiRequest<CalendarScheduledTask>(
      `/api/v1/calendar-events/${eventId}/scheduled-tasks`,
      { method: 'POST', body: payload }
    );
  },

  listForEvent(eventId: string) {
    return apiRequest<{ tasks: CalendarScheduledTask[]; meta: { count: number } }>(
      `/api/v1/calendar-events/${eventId}/scheduled-tasks`
    );
  },

  update(
    id: string,
    payload: Partial<{
      title: string;
      message: string;
      scheduledAt: string;
      status: 'pending' | 'cancelled';
      channel: NotificationChannel;
      metadata: Record<string, unknown>;
    }>
  ) {
    return apiRequest<CalendarScheduledTask>(`${BASE}/${id}`, {
      method: 'PATCH',
      body: payload,
    });
  },

  remove(id: string) {
    return apiRequest<void>(`${BASE}/${id}`, { method: 'DELETE' });
  },

  listNotifications(params?: {
    calendarEventId?: string;
    scheduledTaskId?: string;
    from?: string;
    to?: string;
  }) {
    const query = new URLSearchParams(
      Object.entries(params ?? {}).filter(([, v]) => v != null) as [string, string][]
    );
    const qs = query.toString();
    return apiRequest<{ notifications: CalendarNotification[]; meta: { count: number } }>(
      `${BASE}/notifications${qs ? `?${qs}` : ''}`
    );
  },
};
```

---

## 6. Flujo recomendado en la UI

### Flujo A — Crear evento con recordatorio

```
Usuario crea evento en el calendario
        ↓
POST /calendar-events  →  guardas event.id
        ↓
POST /calendar-events/{id}/scheduled-tasks
     { reminderMinutesBefore: 15, channel: "in_app" }
        ↓
Muestras badge "Recordatorio activo" en la tarjeta del evento
```

### Flujo B — Panel de notificaciones

```
Al abrir vista de calendario o campana 🔔
        ↓
GET /calendar-scheduled-tasks/notifications?from=...&to=...
        ↓
Renderizas lista: título, mensaje, deliveredAt, status
```

### Flujo C — Gestionar recordatorios de un evento

```
Usuario abre detalle del evento
        ↓
GET /calendar-events/{id}/scheduled-tasks
        ↓
Lista con botones: Cancelar (PATCH status cancelled) | Eliminar (DELETE)
```

### Flujo D — Integración con N8N desde el frontend

```
Usuario escribe prompt / sube datos
        ↓
POST /integrations/n8n/send  { text, metadata }
        ↓
Muestras respuesta en pantalla
        ↓
(Opcional) Si otro servicio devuelve Gemini, POST /integrations/n8n/receive
```

### Ejemplo Vue 3 (composable)

```typescript
// src/composables/useCalendarReminders.ts
import { ref } from 'vue';
import { calendarScheduledTasksApi } from '@/api/calendarScheduledTasksApi';

export function useCalendarReminders(eventId: string) {
  const tasks = ref([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function load() {
    loading.value = true;
    error.value = null;
    try {
      const { tasks: list } = await calendarScheduledTasksApi.listForEvent(eventId);
      tasks.value = list;
    } catch (e) {
      error.value = (e as Error).message;
    } finally {
      loading.value = false;
    }
  }

  async function addReminder(minutesBefore = 15) {
    await calendarScheduledTasksApi.createForEvent(eventId, {
      reminderMinutesBefore: minutesBefore,
      channel: 'in_app',
    });
    await load();
  }

  async function cancelReminder(taskId: string) {
    await calendarScheduledTasksApi.update(taskId, { status: 'cancelled' });
    await load();
  }

  return { tasks, loading, error, load, addReminder, cancelReminder };
}
```

---

## 7. Tipos TypeScript

Copia este bloque a `src/types/api.ts` si no usas los servicios anteriores:

```typescript
// N8N
export interface N8nSendTextRequest {
  text: string;
  metadata?: Record<string, unknown>;
}

export interface N8nGeminiReceiveRequest {
  task: string;
  gemini_response: {
    content: {
      parts: Array<{ text?: string }>;
      role?: string;
    };
    finishReason?: string;
  };
  timestamp?: string;
  filename?: string;
  metadata?: Record<string, unknown>;
}

export interface N8nMarkdownUploadRequest {
  filename: string;
  content: string;
  metadata?: Record<string, unknown>;
}

// Calendario — tareas programadas
export type ScheduledTaskStatus =
  | 'pending' | 'processing' | 'sent' | 'failed' | 'cancelled';

export type NotificationChannel = 'in_app' | 'webhook' | 'n8n';
```

---

## 8. Errores comunes

| Código | Causa | Qué hacer en el frontend |
|--------|-------|---------------------------|
| `400` | Validación (Zod): fechas, UUID, campos faltantes | Mostrar `error` o `error.errors` del body |
| `404` | Tarea o evento no encontrado | Redirigir o refrescar lista |
| `401` | Webhook sin credencial en rutas protegidas | Enviar `X-API-KEY` si aplica |
| `500` | Error de servidor / Supabase | Mensaje genérico + reintentar |
| `503` | `N8N_WEBHOOK_URL` no configurada en `/send` saliente | Avisar al usuario que N8N no está disponible |

**Validaciones importantes al crear tarea:**

- Enviar `reminderMinutesBefore` **o** `scheduledAt`, no omitir ambos.
- `scheduledAt` debe ser ISO 8601 con zona horaria, ej: `2026-05-20T09:00:00-05:00`.
- Si usas `reminderMinutesBefore`, el `calendarEventId` es obligatorio (se envía automáticamente en la ruta anidada).

---

## Checklist de implementación

- [ ] Variable `VITE_API_BASE_URL` configurada
- [ ] Cliente `apiRequest` creado
- [ ] Módulo `n8nApi.ts` con `sendTextToN8n` y `uploadMarkdownFromGemini`
- [ ] Módulo `calendarScheduledTasksApi.ts` con CRUD y notificaciones
- [ ] Al crear evento → opción “Añadir recordatorio” (15 / 30 / 60 min)
- [ ] Vista de detalle de evento → lista de tareas + cancelar
- [ ] Campana o panel → `GET /notifications`
- [ ] Manejo de errores 400/404/500 en toasts o alerts
- [ ] (Producción) Ejecutar SQL `supabase/calendar_scheduled_tasks_schema.sql` en Supabase

---

## Referencia rápida de URLs

| Recurso | URL |
|---------|-----|
| Health | `GET /health` |
| N8N enviar texto | `POST /api/v1/integrations/n8n/send` |
| N8N recibir markdown | `POST /api/v1/integrations/n8n/receive` |
| N8N subir markdown | `POST /api/v1/integrations/n8n/markdown/upload` |
| Eventos calendario | `GET/POST/PATCH/DELETE /api/v1/calendar-events` |
| Tareas programadas | `GET/POST/PATCH/DELETE /api/v1/calendar-scheduled-tasks` |
| Tareas por evento | `GET/POST /api/v1/calendar-events/:eventId/scheduled-tasks` |
| Notificaciones | `GET /api/v1/calendar-scheduled-tasks/notifications` |

---

*Documento generado para la API Auditory (RECS). Actualiza este archivo si cambian las rutas o contratos en el backend.*

---

## Tablas Supabase (N8N)

Para persistir logs, intercambios de texto y documentos markdown en base de datos, ejecuta:

- `supabase/n8n_integration_schema.sql`

Documentación del esquema y mapeo método HTTP → tabla:

- `docs/n8n-esquema-metodos-y-tablas.md`
