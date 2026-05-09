# Manual de Usuario — Auditory REST API

**Framework:** Express + TypeScript  
**Base URL:** `/api/v1`  
**Puerto:** (definido en entorno)

---

## Índice

1. [Introducción a los Métodos HTTP](#1-introducción-a-los-métodos-http)
2. [Resumen de Endpoints](#2-resumen-de-endpoints)
3. [Ejemplos de Uso](#3-ejemplos-de-uso)
   - [GET — Obtener recursos](#31-get--obtener-recursos)
   - [POST — Crear recursos](#32-post--crear-recursos)
   - [PUT — Actualizar recursos](#33-put--actualizar-recursos)
   - [DELETE — Eliminar recursos](#34-delete--eliminar-recursos)
4. [Listado Completo de Endpoints](#4-listado-completo-de-endpoints)

---

## 1. Introducción a los Métodos HTTP

### GET

El método **GET** se utiliza para **obtener (leer) recursos** del servidor. Es un método seguro e idempotente, lo que significa que no modifica el estado del servidor y que múltiples llamadas idénticas producen el mismo resultado.

- **Propósito:** Consultar, listar o buscar recursos.
- **Cuerpo:** No debe incluir un cuerpo (`body`) en la petición.
- **Respuesta exitosa:** `200 OK` con los datos solicitados.
- **Ejemplos:** Obtener todos los pacientes, obtener un doctor por ID, buscar respuestas por paciente.

### POST

El método **POST** se utiliza para **crear nuevos recursos** en el servidor. No es idempotente: múltiples llamadas idénticas pueden crear múltiples recursos.

- **Propósito:** Crear un nuevo recurso.
- **Cuerpo:** Debe incluir un JSON con los datos necesarios para la creación.
- **Respuesta exitosa:** `201 Created` con el recurso creado.
- **Ejemplos:** Registrar un paciente, crear un cuestionario, iniciar sesión.

### PUT

El método **PUT** se utiliza para **actualizar completamente un recurso existente**. Es idempotente: múltiples llamadas idénticas producen el mismo estado final.

- **Propósito:** Actualizar un recurso existente.
- **Cuerpo:** Debe incluir un JSON con los campos a actualizar (parcial o total).
- **Respuesta exitosa:** `200 OK` con el recurso actualizado.
- **Ejemplos:** Actualizar datos de un doctor, modificar un screening, editar notas de tinnitus.

### DELETE

El método **DELETE** se utiliza para **eliminar un recurso existente** del servidor.

- **Propósito:** Eliminar un recurso.
- **Cuerpo:** Generalmente no incluye cuerpo.
- **Respuesta exitosa:** `200 OK` / `204 No Content` confirmando la eliminación.
- **Ejemplos:** Eliminar un paciente, borrar una asignación, remover un sonido relajante.

---

## 2. Resumen de Endpoints

| Método | Cantidad |
|--------|----------|
| **GET** | 60 |
| **POST** | 25 |
| **PUT** | 18 |
| **DELETE** | 19 |
| **Total** | **122** |

---

## 3. Ejemplos de Uso

### 3.1 GET — Obtener recursos

**Listar todos los pacientes:**

```bash
curl -X GET http://localhost:3000/api/v1/patients/
```

Respuesta esperada (`200 OK`):

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "fullName": "Juan Pérez",
    "documentType": "Cedula de ciudadania",
    "documentNumber": "1234567890",
    "birthDate": "1990-05-15",
    "height": 1.75,
    "weight": 70.5,
    "isAllergic": false,
    "hasConsent": true
  }
]
```

**Obtener un doctor por ID:**

```bash
curl -X GET http://localhost:3000/api/v1/doctors/550e8400-e29b-41d4-a716-446655440001
```

Respuesta esperada (`200 OK`):

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "fullName": "Dra. María García",
  "documentType": "CC",
  "documentNumber": "987654321",
  "email": "maria.garcia@hospital.com",
  "phone": "+57 300 123 4567",
  "gender": "F",
  "isActive": true
}
```

**Obtener todas las investigaciones auditivas:**

```bash
curl -X GET http://localhost:3000/api/v1/research/
```

**Obtener notas de un paciente específico:**

```bash
curl -X GET http://localhost:3000/api/v1/tinnitus-notes/550e8400-e29b-41d4-a716-446655440000
```

**Verificar si un paciente existe en asignaciones:**

```bash
curl -X GET http://localhost:3000/api/v1/assignments/check/patient/550e8400-e29b-41d4-a716-446655440000
```

---

### 3.2 POST — Crear recursos

**Crear un paciente:**

```bash
curl -X POST http://localhost:3000/api/v1/patients/ \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Juan Pérez",
    "documentType": "Cedula de ciudadania",
    "documentNumber": "1234567890",
    "birthDate": "1990-05-15",
    "height": 1.75,
    "weight": 70.5,
    "isAllergic": false,
    "familyData": {
      "father": {
        "fullName": "Carlos Pérez",
        "age": 55,
        "diseases": ["Hipertensión"]
      },
      "mother": {
        "fullName": "Ana López",
        "age": 52,
        "diseases": []
      }
    },
    "hasConsent": true
  }'
```

Respuesta esperada (`201 Created`):

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "fullName": "Juan Pérez",
  "documentType": "Cedula de ciudadania",
  "documentNumber": "1234567890",
  "birthDate": "1990-05-15",
  "height": 1.75,
  "weight": 70.5,
  "isAllergic": false,
  "hasConsent": true
}
```

**Registrar un usuario (login):**

```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "idPatient": "550e8400-e29b-41d4-a716-446655440000",
    "email": "juan.perez@email.com",
    "username": "juanperez",
    "password": "miPasswordSegura123",
    "hasConsent": true
  }'
```

**Iniciar sesión:**

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan.perez@email.com",
    "password": "miPasswordSegura123"
  }'
```

Respuesta esperada (`200 OK`):

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Crear una investigación auditiva:**

```bash
curl -X POST http://localhost:3000/api/v1/research/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Estudio de pérdida auditiva en adultos mayores",
    "description": "Investigación para evaluar la prevalencia de hipoacusia en mayores de 60 años"
  }'
```

**Crear un screening (tamizaje):**

```bash
curl -X POST http://localhost:3000/api/v1/screenings/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tamizaje Auditivo Básico",
    "description": "Evaluación inicial de capacidad auditiva",
    "questions": [
      {
        "sound": "audio-01.mp3",
        "title": "¿Puede escuchar este tono?",
        "optionsAnswer": [
          { "text": "Sí", "value": 1 },
          { "text": "No", "value": 0 }
        ]
      }
    ]
  }'
```

**Cerrar sesión:**

```bash
curl -X POST http://localhost:3000/api/v1/auth/logout \
  -H "Content-Type: application/json" \
  -d '{
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }'
```

---

### 3.3 PUT — Actualizar recursos

**Actualizar un paciente:**

```bash
curl -X PUT http://localhost:3000/api/v1/patients/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Juan Pérez Actualizado",
    "weight": 72.3,
    "isAllergic": true
  }'
```

Respuesta esperada (`200 OK`):

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "fullName": "Juan Pérez Actualizado",
  "weight": 72.3,
  "isAllergic": true
}
```

**Actualizar un doctor:**

```bash
curl -X PUT http://localhost:3000/api/v1/doctors/550e8400-e29b-41d4-a716-446655440001 \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nuevo.email@hospital.com",
    "phone": "+57 300 999 8888",
    "address": "Calle 123 #45-67"
  }'
```

**Actualizar una investigación auditiva:**

```bash
curl -X PUT http://localhost:3000/api/v1/research/550e8400-e29b-41d4-a716-446655440010 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Estudio actualizado",
    "description": "Nueva descripción del estudio"
  }'
```

**Actualizar un screening:**

```bash
curl -X PUT http://localhost:3000/api/v1/screenings/550e8400-e29b-41d4-a716-446655440020 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tamizaje Auditivo Avanzado",
    "description": "Evaluación detallada de capacidad auditiva"
  }'
```

**Actualizar una nota de screening:**

```bash
curl -X PUT http://localhost:3000/api/v1/screening-notes/550e8400-e29b-41d4-a716-446655440030 \
  -H "Content-Type: application/json" \
  -d '{
    "content": "El paciente presenta mejoría en oído derecho"
  }'
```

---

### 3.4 DELETE — Eliminar recursos

**Eliminar un paciente:**

```bash
curl -X DELETE http://localhost:3000/api/v1/patients/550e8400-e29b-41d4-a716-446655440000
```

Respuesta esperada (`200 OK`):

```json
{
  "message": "Paciente eliminado correctamente"
}
```

**Eliminar una asignación de paciente a screening:**

```bash
curl -X DELETE http://localhost:3000/api/v1/assignments/550e8400-e29b-41d4-a716-446655440005
```

**Eliminar todas las asignaciones de un paciente:**

```bash
curl -X DELETE http://localhost:3000/api/v1/assignments/patient/550e8400-e29b-41d4-a716-446655440000
```

**Eliminar un sonido relajante:**

```bash
curl -X DELETE http://localhost:3000/api/v1/relaxing-sounds/550e8400-e29b-41d4-a716-446655440007
```

**Eliminar un análisis de tinnitus:**

```bash
curl -X DELETE http://localhost:3000/api/v1/tinnitus-analysis/550e8400-e29b-41d4-a716-446655440008
```

---

## 4. Listado Completo de Endpoints

### 4.1 Health Check

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/health` | Verificar estado del servidor |

---

### 4.2 Auditory Research (`/api/v1/research`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear una investigación auditiva |
| GET | `/` | Obtener todas las investigaciones |
| GET | `/:id` | Obtener una investigación por ID |
| PUT | `/:id` | Actualizar una investigación |
| DELETE | `/:id` | Eliminar una investigación |
| POST | `/:idResearch/chat-sessions` | Crear una sesión de chat para una investigación |
| GET | `/:idResearch/chat-sessions/:idSession` | Obtener una sesión de chat por ID |

---

### 4.3 Research Notes (`/api/v1/research-notes`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear una nota de investigación |
| GET | `/` | Obtener todas las notas |
| GET | `/research/:researchId` | Obtener notas por ID de investigación |
| GET | `/:id` | Obtener una nota por ID |
| PUT | `/:id` | Actualizar una nota |
| DELETE | `/:id` | Eliminar una nota |

---

### 4.4 Tinnitus Questionnaire (`/api/v1/questionnaires`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear un cuestionario de tinnitus |
| GET | `/` | Obtener todos los cuestionarios |
| GET | `/:id` | Obtener un cuestionario por ID |
| PUT | `/:id` | Actualizar un cuestionario |
| DELETE | `/:id` | Eliminar un cuestionario |

---

### 4.5 Screening (`/api/v1/screenings`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear un screening (tamizaje) |
| GET | `/` | Obtener todos los screenings |
| GET | `/:id` | Obtener un screening por ID |
| PUT | `/:id` | Actualizar un screening |
| DELETE | `/:id` | Eliminar un screening |

---

### 4.6 Relaxing Sounds (`/api/v1/relaxing-sounds`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear un sonido relajante |
| GET | `/` | Obtener todos los sonidos relajantes |
| GET | `/:id` | Obtener un sonido por ID |
| PUT | `/:id` | Actualizar un sonido relajante |
| DELETE | `/:id` | Eliminar un sonido relajante |

---

### 4.7 Patients (`/api/v1/patients`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear un paciente |
| GET | `/` | Obtener todos los pacientes |
| GET | `/:id` | Obtener un paciente por ID |
| PUT | `/:id` | Actualizar un paciente |
| DELETE | `/:id` | Eliminar un paciente |

---

### 4.8 Assignments (Paciente-Screening) (`/api/v1/assignments`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Asignar un paciente a un screening |
| GET | `/patient/:patientId` | Obtener asignaciones por paciente |
| GET | `/:id` | Obtener una asignación por ID |
| DELETE | `/:id` | Eliminar una asignación por ID |
| DELETE | `/patient/:patientId` | Eliminar asignaciones por paciente |
| POST | `/validate` | Validar una asignación |
| GET | `/check/patient/:patientId` | Verificar si un paciente existe en asignaciones |
| GET | `/check/screening/:screeningId` | Verificar si un screening existe en asignaciones |

---

### 4.9 Tinnitus Assignments (`/api/v1/tinnitus-assignments`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Asignar un paciente a tinnitus |
| GET | `/patient/:idPatient` | Obtener asignaciones por paciente |
| GET | `/:id` | Obtener una asignación por ID |
| DELETE | `/:id` | Eliminar una asignación por ID |
| DELETE | `/patient/:idPatient` | Eliminar asignaciones por paciente |
| POST | `/validate` | Validar una asignación de tinnitus |
| GET | `/check/patient/:idPatient` | Verificar si un paciente existe en asignaciones de tinnitus |
| GET | `/check/tinnitus/:idTinnitus` | Verificar si un tinnitus existe en asignaciones |

---

### 4.10 Auth (`/api/v1/auth`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/register` | Registrar un nuevo paciente (usuario) |
| POST | `/login` | Iniciar sesión |
| POST | `/logout` | Cerrar sesión |
| GET | `/validate` | Validar un token de autenticación |

---

### 4.11 Screening Responses (`/api/v1/screening-responses`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear una respuesta de screening |
| GET | `/all` | Obtener todas las respuestas |
| GET | `/:id` | Obtener una respuesta por ID |
| PUT | `/:id` | Actualizar una respuesta |
| DELETE | `/:id` | Eliminar una respuesta |
| GET | `/patient/:patientId` | Obtener respuestas por paciente |
| GET | `/screening/:screeningId` | Obtener respuestas por screening |
| POST | `/validate` | Validar una respuesta de screening |

---

### 4.12 Screening Notes (`/api/v1/screening-notes`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear una nota de screening |
| GET | `/` | Obtener todas las notas |
| GET | `/patient/:patientId` | Obtener notas por paciente |
| GET | `/screening/:screeningId` | Obtener notas por screening |
| GET | `/:id` | Obtener una nota por ID |
| PUT | `/:id` | Actualizar una nota |
| DELETE | `/:id` | Eliminar una nota |

---

### 4.13 Doctors (`/api/v1/doctors`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear un doctor |
| GET | `/` | Obtener todos los doctores |
| GET | `/:id` | Obtener un doctor por ID |
| PUT | `/:id` | Actualizar un doctor |
| DELETE | `/:id` | Eliminar un doctor |

---

### 4.14 Doctor Professional Data (`/api/v1/doctor-professional-data`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear datos profesionales de un doctor |
| GET | `/` | Obtener todos los datos profesionales |
| GET | `/doctor/:doctorId` | Obtener datos por ID de doctor |
| GET | `/:id` | Obtener datos por ID |
| PUT | `/:id` | Actualizar datos profesionales |
| DELETE | `/:id` | Eliminar datos profesionales |

---

### 4.15 Tinnitus Responses (`/api/v1/tinnitus-responses`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear una respuesta de tinnitus |
| GET | `/` | Obtener todas las respuestas |
| GET | `/patient/:patientId` | Obtener respuestas por paciente |
| GET | `/questionnaire/:questionnaireId` | Obtener respuestas por cuestionario |
| GET | `/:id` | Obtener una respuesta por ID |
| PUT | `/:id` | Actualizar una respuesta |
| DELETE | `/:id` | Eliminar una respuesta |

---

### 4.16 Tinnitus Notes (`/api/v1/tinnitus-notes`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Obtener todas las notas de tinnitus |
| GET | `/note/:id` | Obtener una nota por ID |
| PUT | `/note/:id` | Actualizar una nota |
| DELETE | `/note/:id` | Eliminar una nota |
| GET | `/questionnaire/:questionnaireId` | Obtener notas por cuestionario |
| GET | `/response/:responseId` | Obtener notas por respuesta |
| GET | `/:id_patient` | Obtener notas por paciente |
| POST | `/:id_patient` | Crear una nota para un paciente |

---

### 4.17 Tinnitus Analysis (`/api/v1/tinnitus-analysis`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear un análisis de tinnitus |
| GET | `/` | Obtener todos los análisis |
| GET | `/patient/:patientId` | Obtener análisis por paciente |
| GET | `/questionnaire/:questionnaireId` | Obtener análisis por cuestionario |
| GET | `/response/:responseId` | Obtener análisis por respuesta |
| GET | `/:id` | Obtener un análisis por ID |
| PUT | `/:id` | Actualizar un análisis |
| DELETE | `/:id` | Eliminar un análisis |

---

### 4.18 Tinnitus Notes Analysis (`/api/v1/tinnitus-notes-analysis`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear un análisis de notas de tinnitus |
| GET | `/` | Obtener todos los análisis |
| GET | `/response/:responseId` | Obtener análisis por respuesta |
| GET | `/patient/:patientId` | Obtener análisis por paciente |
| GET | `/questionnaire/:questionnaireId` | Obtener análisis por cuestionario |
| GET | `/:id` | Obtener un análisis por ID |
| PUT | `/:id` | Actualizar un análisis |
| DELETE | `/:id` | Eliminar un análisis |

---

### 4.19 Investigaciones (`/api/v1/investigaciones`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear una investigación |
| GET | `/` | Obtener todas las investigaciones |
| GET | `/:id` | Obtener una investigación por ID |
| PUT | `/:id` | Actualizar una investigación |
| DELETE | `/:id` | Eliminar una investigación |
