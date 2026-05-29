import { Router } from 'express';
import { CalendarAnalysisNoteController } from '../controllers/CalendarAnalysisNoteController';

const router = Router();

router.post('/', CalendarAnalysisNoteController.create);
router.get('/', CalendarAnalysisNoteController.findAll);
router.get('/analysis/:calendarAiAnalysisId', CalendarAnalysisNoteController.findByAnalysisId);
router.get('/:id', CalendarAnalysisNoteController.findById);
router.delete('/:id', CalendarAnalysisNoteController.delete);

export default router;
