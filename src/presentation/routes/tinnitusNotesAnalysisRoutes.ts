import { Router } from 'express';
import { TinnitusNotesAnalysisController } from '../controllers';

const router = Router();

// POST /api/v1/tinnitus-notes-analysis - Crear análisis de notas
router.post('/', TinnitusNotesAnalysisController.create);

// GET /api/v1/tinnitus-notes-analysis - Obtener todos los análisis
router.get('/', TinnitusNotesAnalysisController.findAll);

// Rutas específicas (deben ir ANTES de las rutas con parámetros genéricos)
router.get('/response/:responseId', TinnitusNotesAnalysisController.findByResponse);
router.get('/patient/:patientId', TinnitusNotesAnalysisController.findByPatient);
router.get('/questionnaire/:questionnaireId', TinnitusNotesAnalysisController.findByQuestionnaire);

// GET /api/v1/tinnitus-notes-analysis/:id - Obtener análisis por ID
router.get('/:id', TinnitusNotesAnalysisController.findById);

// PUT /api/v1/tinnitus-notes-analysis/:id - Actualizar análisis
router.put('/:id', TinnitusNotesAnalysisController.update);

// DELETE /api/v1/tinnitus-notes-analysis/:id - Eliminar análisis
router.delete('/:id', TinnitusNotesAnalysisController.delete);

export default router;
