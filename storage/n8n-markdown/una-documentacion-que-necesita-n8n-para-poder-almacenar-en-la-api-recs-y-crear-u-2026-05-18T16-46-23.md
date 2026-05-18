Esta guía detalla cómo preparar tu **API RECS** para recibir datos desde **n8n** y cómo configurar el flujo en n8n para generar y enviar un archivo Markdown.

---

### Parte 1: Implementación en tu API RECS (El Servidor)

Para que n8n pueda comunicarse con tu API, esta debe cumplir con ciertos estándares. Aquí los pasos para tu backend:

#### 1. Definir el Endpoint
Crea una ruta `POST` (ejemplo: `/v1/markdown/upload`) que acepte contenido en formato **JSON** o **Multipart/form-data**.

#### 2. Estructura de Datos Esperada
Tu API debe estar lista para recibir un JSON con esta estructura mínima:
```json
{
  "filename": "nombre-del-archivo.md",
  "content": "# Título\nContenido en markdown...",
  "metadata": {
    "author": "n8n-bot",
    "category": "documentacion"
  }
}
```

#### 3. Habilitar CORS y Autenticación
*   **CORS:** Si n8n se ejecuta en un dominio distinto, asegúrate de permitir las peticiones.
*   **Auth:** Implementa una `X-API-KEY` o `Bearer Token` en los headers para que n8n se autentique de forma segura.

#### 4. Lógica de Almacenamiento
En tu código (Node.js, Python, etc.), procesa el campo `content` y guárdalo físicamente con extensión `.md` o almacénalo en tu base de datos como un string de texto.

---

### Parte 2: Configuración del Flujo en n8n

Sigue estos pasos dentro del editor de n8n:

#### Paso 1: Nodo "Edit Fields" (Preparar el Markdown)
Antes de enviar a la API, debes dar formato al texto Markdown.
1.  Añ