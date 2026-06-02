import { Router } from 'express';
import { CalendarAiAnalysisController } from '../controllers';

const router = Router();

router.post('/', CalendarAiAnalysisController.create);
router.get('/', CalendarAiAnalysisController.findAll);
router.get('/:id', CalendarAiAnalysisController.findById);
router.patch('/:id', CalendarAiAnalysisController.update);
router.delete('/:id', CalendarAiAnalysisController.delete);

export default router;
