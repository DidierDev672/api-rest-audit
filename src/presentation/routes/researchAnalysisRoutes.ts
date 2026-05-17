import { Router } from 'express';
import { ResearchAnalysisController } from '../controllers';

const router = Router();

router.get('/notes', ResearchAnalysisController.findAll);
router.post('/', ResearchAnalysisController.create);
router.get('/research/:researchId', ResearchAnalysisController.findByResearchId);
router.get('/:id', ResearchAnalysisController.findById);
router.put('/:id', ResearchAnalysisController.update);
router.delete('/:id', ResearchAnalysisController.delete);
router.delete('/research/:researchId', ResearchAnalysisController.deleteByResearchId);

export default router;