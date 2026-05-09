# Auditory API - Documentación de Endpoints REST

Base URL: `/api/v1`

---

## 1. Tinnitus Notes (`/tinnitus-notes`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Obtener todas las notas |
| GET | `/note/:id` | Obtener nota por ID |
| PUT | `/note/:id` | Actualizar nota |
| DELETE | `/note/:id` | Eliminar nota |
| GET | `/questionnaire/:questionnaireId` | Obtener notas por cuestionario |
| GET | `/response/:responseId` | Obtener notas por respuesta |
| GET | `/:id_patient` | Obtener notas por paciente |
| POST | `/:id_patient` | Crear nota para un paciente |

---

## 2. Tinnitus Analysis (`/tinnitus-analysis`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear análisis |
| GET | `/` | Obtener todos los análisis |
| GET | `/patient/:patientId` | Obtener por paciente |
| GET | `/questionnaire/:questionnaireId` | Obtener por cuestionario |
| GET | `/response/:responseId` | Obtener por respuesta |
| GET | `/:id` | Obtener por ID |
| PUT | `/:id` | Actualizar análisis |
| DELETE | `/:id` | Eliminar análisis |

---

## 3. Tinnitus Notes Analysis (`/tinnitus-notes-analysis`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear análisis de notas |
| GET | `/` | Obtener todos los análisis |
| GET | `/response/:responseId` | Obtener por respuesta |
| GET | `/patient/:patientId` | Obtener por paciente |
| GET | `/questionnaire/:questionnaireId` | Obtener por cuestionario |
| GET | `/:id` | Obtener por ID |
| PUT | `/:id` | Actualizar análisis |
| DELETE | `/:id` | Eliminar análisis |

---

## 4. Research Notes (`/research-notes`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear nota |
| GET | `/` | Obtener todas las notas |
| GET | `/research/:researchId` | Obtener por investigación |
| GET | `/:id` | Obtener por ID |
| PUT | `/:id` | Actualizar nota |
| DELETE | `/:id` | Eliminar nota |

---

## 5. Research Analysis (`/research-analysis`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear análisis |
| GET | `/:id` | Obtener por ID |
| GET | `/research/:researchId` | Obtener por investigación |
| PUT | `/:id` | Actualizar análisis |
| DELETE | `/:id` | Eliminar análisis |
| DELETE | `/research/:researchId` | Eliminar por investigación |

---

## 6. Auditory Research (`/auditory-research`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear investigación |
| GET | `/` | Obtener todas las investigaciones |
| GET | `/:id` | Obtener por ID |
| PUT | `/:id` | Actualizar investigación |
| DELETE | `/:id` | Eliminar investigación |
| POST | `/:idResearch/chat-sessions` | Crear sesión de chat |
| GET | `/:idResearch/chat-sessions/:idSession` | Obtener sesión de chat |

---

## 7. Investigacion (`/investigacion`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear investigación |
| GET | `/` | Obtener todas las investigaciones |
| GET | `/:id` | Obtener por ID |

---

## 8. Tinnitus Questionnaire (`/tinnitus-questionnaire`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear cuestionario |
| GET | `/` | Obtener todos los cuestionarios |
| GET | `/:id` | Obtener por ID |
| PUT | `/:id` | Actualizar cuestionario |
| DELETE | `/:id` | Eliminar cuestionario |

---

## 9. Tinnitus Response (`/tinnitus-response`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear respuesta |
| GET | `/` | Obtener todas las respuestas |
| GET | `/patient/:patientId` | Obtener por paciente |
| GET | `/questionnaire/:questionnaireId` | Obtener por cuestionario |
| GET | `/:id` | Obtener por ID |
| PUT | `/:id` | Actualizar respuesta |
| DELETE | `/:id` | Eliminar respuesta |

---

## 10. Screening (`/screening`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear tamizaje |
| GET | `/` | Obtener todos los tamizajes |
| GET | `/:id` | Obtener por ID |
| PUT | `/:id` | Actualizar tamizaje |
| DELETE | `/:id` | Eliminar tamizaje |

---

## 11. Relaxing Sounds (`/relaxing-sounds`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear sonido relajante |
| GET | `/` | Obtener todos los sonidos |
| GET | `/:id` | Obtener por ID |
| PUT | `/:id` | Actualizar sonido |
| DELETE | `/:id` | Eliminar sonido |

---

## 12. Patients (`/patients`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear paciente |
| GET | `/` | Obtener todos los pacientes |
| GET | `/:id` | Obtener por ID |
| PUT | `/:id` | Actualizar paciente |
| DELETE | `/:id` | Eliminar paciente |

---

## 13. Patient Screening Assignment (`/patient-screening-assignment`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Asignar paciente a tamizaje |
| GET | `/patient/:patientId` | Obtener por paciente |
| GET | `/:id` | Obtener por ID |
| DELETE | `/:id` | Eliminar asignación |
| DELETE | `/patient/:patientId` | Eliminar por paciente |
| POST | `/validate` | Validar asignación |
| GET | `/check/patient/:patientId` | Verificar si paciente existe |
| GET | `/check/screening/:screeningId` | Verificar si tamizaje existe |

---

## 14. Patient Tinnitus Assignment (`/patient-tinnitus-assignment`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Asignar paciente a tinnitus |
| GET | `/patient/:idPatient` | Obtener por paciente |
| GET | `/:id` | Obtener por ID |
| DELETE | `/:id` | Eliminar asignación |
| DELETE | `/patient/:idPatient` | Eliminar por paciente |
| POST | `/validate` | Validar asignación |
| GET | `/check/patient/:idPatient` | Verificar si paciente existe |
| GET | `/check/tinnitus/:idTinnitus` | Verificar si tinnitus existe |

---

## 15. Patient Login (`/patient-login`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/register` | Registrar paciente |
| POST | `/login` | Iniciar sesión |
| POST | `/logout` | Cerrar sesión |
| GET | `/validate` | Validar token |

---

## 16. Screening Response (`/screening-response`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear respuesta |
| GET | `/all` | Obtener todas las respuestas |
| GET | `/:id` | Obtener por ID |
| PUT | `/:id` | Actualizar respuesta |
| DELETE | `/:id` | Eliminar respuesta |
| GET | `/patient/:patientId` | Obtener por paciente |
| GET | `/screening/:screeningId` | Obtener por tamizaje |
| POST | `/validate` | Validar respuesta |

---

## 17. Screening Note (`/screening-note`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear nota |
| GET | `/` | Obtener todas las notas |
| GET | `/patient/:patientId` | Obtener por paciente |
| GET | `/screening/:screeningId` | Obtener por tamizaje |
| GET | `/:id` | Obtener por ID |
| PUT | `/:id` | Actualizar nota |
| DELETE | `/:id` | Eliminar nota |

---

## 18. Doctors (`/doctors`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear doctor |
| GET | `/` | Obtener todos los doctores |
| GET | `/:id` | Obtener por ID |
| PUT | `/:id` | Actualizar doctor |
| DELETE | `/:id` | Eliminar doctor |

---

## 19. Doctor Professional Data (`/doctor-professional-data`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear datos profesionales |
| GET | `/` | Obtener todos los datos |
| GET | `/doctor/:doctorId` | Obtener por doctor |
| GET | `/:id` | Obtener por ID |
| PUT | `/:id` | Actualizar datos |
| DELETE | `/:id` | Eliminar datos |

---

## Resumen de Métodos HTTP

- **GET**: 47 endpoints
- **POST**: 22 endpoints
- **PUT**: 18 endpoints
- **DELETE**: 19 endpoints

**Total: 106 endpoints**
