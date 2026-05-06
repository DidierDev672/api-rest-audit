import { Router } from 'express';
import { TinnitusNoteController } from '../controllers';

const router = Router();

// GET /api/v1/tinnitus-notes - Obtener todas las notas
router.get('/', TinnitusNoteController.findAll);

// Rutas específicas (deben ir ANTES de las rutas con parámetros)
router.get('/note/:id', TinnitusNoteController.findById);
router.put('/note/:id', TinnitusNoteController.update);
router.delete('/note/:id', TinnitusNoteController.delete);
router.get('/questionnaire/:questionnaireId', TinnitusNoteController.findByQuestionnaire);
router.get('/response/:responseId', TinnitusNoteController.findByResponse);

// GET /api/v1/tinnitus-notes/:id_patient - Obtener notas por paciente
router.get('/:id_patient', TinnitusNoteController.findByPatient);

// POST /api/v1/tinnitus-notes/:id_patient - Crear nota para un paciente
router.post('/:id_patient', TinnitusNoteController.createForPatient);

export default router;