import { Router } from 'express';
import { AiDocumentAnalysisNoteController } from '../controllers/AiDocumentAnalysisNoteController';

const router = Router();

router.post('/', AiDocumentAnalysisNoteController.create);
router.get('/', AiDocumentAnalysisNoteController.findAll);
router.get(
  '/analysis/:aiDocumentAnalysisId',
  AiDocumentAnalysisNoteController.findByAnalysisId,
);
router.get('/:id', AiDocumentAnalysisNoteController.findById);
router.delete('/:id', AiDocumentAnalysisNoteController.delete);

export default router;
