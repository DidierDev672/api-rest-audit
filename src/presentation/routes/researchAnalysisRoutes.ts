import { Router } from 'express';
import { ResearchAnalysisController } from '../controllers';

const router = Router();

router.post('/', ResearchAnalysisController.create);
router.get('/:id', ResearchAnalysisController.findById);
router.get('/research/:researchId', ResearchAnalysisController.findByResearchId);
router.put('/:id', ResearchAnalysisController.update);
router.delete('/:id', ResearchAnalysisController.delete);
router.delete('/research/:researchId', ResearchAnalysisController.deleteByResearchId);

export default router;