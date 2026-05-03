# Auditory Health API

REST API para investigación auditiva, cuestionarios de tinnitus, tamizajes y sonidos relajantes.

## Tecnologías

- **Runtime:** Node.js
- **Lenguaje:** TypeScript
- **Framework:** Express.js
- **Base de datos:** Supabase (PostgreSQL)
- **Validación:** Zod
- **Arquitectura:** Onion (Domain-Driven Design) + SOLID

## Estructura del Proyecto

```
src/
├── domain/
│   ├── entities/          # Entidades del dominio
│   ├── repositories/      # Interfaces de repositorios
│   └── usecases/          # Casos de uso (lógica de negocio)
├── infrastructure/
│   ├── database/          # Implementaciones de repositorios (Supabase)
│   └── server/            # Servidor Express
└── presentation/
    ├── controllers/       # Controladores HTTP
    ├── dto/              # Data Transfer Objects (validación Zod)
    └── routes/           # Rutas de Express
```

##安装

```bash
npm install
```

## Configuración

1. Crear proyecto en [Supabase](https://supabase.com)
2. Ejecutar el script `supabase/schema.sql` en el SQL Editor
3. Configurar `.env`:

```
SUPABASE_URL=tu_supabase_url
SUPABASE_KEY=tu_supabase_anon_key
PORT=3000
```

## Ejecutar

```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm start
```

## Endpoints

### Investigaciones Auditivas
- `POST /api/v1/research` - Crear investigación
- `GET /api/v1/research` - Listar todas
- `GET /api/v1/research/:id` - Obtener por ID
- `PUT /api/v1/research/:id` - Actualizar
- `DELETE /api/v1/research/:id` - Eliminar

### Cuestionarios de Tinnitus
- `POST /api/v1/questionnaires` - Crear cuestionario
- `GET /api/v1/questionnaires` - Listar todos
- `GET /api/v1/questionnaires/:id` - Obtener por ID
- `PUT /api/v1/questionnaires/:id` - Actualizar
- `DELETE /api/v1/questionnaires/:id` - Eliminar

### Tamizajes
- `POST /api/v1/screenings` - Crear tamizaje
- `GET /api/v1/screenings` - Listar todos
- `GET /api/v1/screenings/:id` - Obtener por ID
- `PUT /api/v1/screenings/:id` - Actualizar
- `DELETE /api/v1/screenings/:id` - Eliminar

### Sonidos Relajantes
- `POST /api/v1/sounds` - Crear sonido
- `GET /api/v1/sounds` - Listar todos
- `GET /api/v1/sounds/:id` - Obtener por ID
- `PUT /api/v1/sounds/:id` - Actualizar
- `DELETE /api/v1/sounds/:id` - Eliminar

## Ejemplos de Request

### Crear Investigación Auditiva
```json
POST /api/v1/research
{
  "name": "Estudio sobre tinnitus",
  "description": "Investigación sobre los efectos del tinnitus en la calidad de vida"
}
```

### Crear Cuestionario de Tinnitus
```json
POST /api/v1/questionnaires
{
  "title": "Cuestionario THI",
  "description": "Tinnitus Handicap Inventory",
  "questions": [
    {
      "title": "Intensidad del tinnitus",
      "description": "¿Qué tan intenso es su tinnitus?",
      "optionsAnswer": [
        { "text": "Leve", "value": 1 },
        { "text": "Moderado", "value": 2 },
        { "text": "Severo", "value": 3 }
      ]
    }
  ]
}
```

### Crear Tamizaje
```json
POST /api/v1/screenings
{
  "title": "Prueba de audición",
  "description": "Identifica el sonido que escuchas",
  "sound": "sounds/nature/thunder.mp3",
  "optionsAnswer": [
    { "text": "Trueno", "value": 1 },
    { "text": "Lluvia", "value": 2 }
  ]
}
```

### Crear Sonido Relajante
```json
POST /api/v1/sounds
{
  "title": "Lluvia suave",
  "description": "Sonido de lluvia para relajación",
  "sound": "sounds/relax/rain_soft.mp3"
}
```
