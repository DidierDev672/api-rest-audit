import { Router } from 'express';
import { ResearchNoteController } from '../controllers';

const router = Router();

router.post('/', ResearchNoteController.create);
router.get('/', ResearchNoteController.findAll);
router.get('/research/:researchId', ResearchNoteController.findByResearchId);
router.get('/:id', ResearchNoteController.findById);
router.put('/:id', ResearchNoteController.update);
router.delete('/:id', ResearchNoteController.delete);

export default router;
