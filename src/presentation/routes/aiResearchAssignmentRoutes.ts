import { Router } from 'express';
import { AiResearchAssignmentController } from '../controllers/AiResearchAssignmentController';

const router = Router();

// Procesamiento manual de investigaciones vencidas (dispara la IA ahora).
router.post('/process-due', AiResearchAssignmentController.processDue);

// Resultados.
router.get('/results/owner/:ownerId', AiResearchAssignmentController.findResultsByOwner);
router.get('/results/:resultId/notes', AiResearchAssignmentController.findResultNotes);
router.post('/results/:resultId/notes', AiResearchAssignmentController.createResultNote);
router.delete('/results/notes/:noteId', AiResearchAssignmentController.deleteResultNote);
router.post('/results/:resultId/seen', AiResearchAssignmentController.markResultSeen);
router.delete('/results/:resultId', AiResearchAssignmentController.deleteResult);

// Asignaciones.
router.post('/', AiResearchAssignmentController.assign);
router.get('/owner/:ownerId', AiResearchAssignmentController.findByOwner);
router.get('/:id/results', AiResearchAssignmentController.findResultsByAssignment);
router.get('/:id', AiResearchAssignmentController.findById);
router.patch('/:id', AiResearchAssignmentController.update);
router.delete('/:id', AiResearchAssignmentController.delete);

export default router;
