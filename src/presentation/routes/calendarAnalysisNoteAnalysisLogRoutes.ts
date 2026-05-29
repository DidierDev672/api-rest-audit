import { Router } from 'express';
import { CalendarAnalysisNoteAnalysisLogController } from '../controllers/CalendarAnalysisNoteAnalysisLogController';

const router = Router();

router.post('/', CalendarAnalysisNoteAnalysisLogController.create);
router.get('/', CalendarAnalysisNoteAnalysisLogController.findAll);
router.get(
  '/analysis/:calendarAiAnalysisId',
  CalendarAnalysisNoteAnalysisLogController.findByAnalysisId,
);
router.get('/:id', CalendarAnalysisNoteAnalysisLogController.findById);

export default router;
