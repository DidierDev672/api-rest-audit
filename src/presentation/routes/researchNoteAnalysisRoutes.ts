import { Router } from 'express';
import { ResearchNoteAnalysisController } from '../controllers/ResearchNoteAnalysisController';
import { authMiddleware } from '../../infrastructure/middleware/authMiddleware';

const router = Router();

router.post('/', authMiddleware, ResearchNoteAnalysisController.create);
router.get('/:id', authMiddleware, ResearchNoteAnalysisController.findById);

export default router;
