import { Router } from 'express';
import { AiDocumentAnalysisController } from '../controllers/AiDocumentAnalysisController';
import { authMiddleware } from '../../infrastructure/middleware/authMiddleware';

const router = Router();

router.get('/', authMiddleware, AiDocumentAnalysisController.findAll);
router.post('/', authMiddleware, AiDocumentAnalysisController.create);
router.get('/document-upload/:documentUploadId', authMiddleware, AiDocumentAnalysisController.findByDocumentUploadId);
router.get('/:id', authMiddleware, AiDocumentAnalysisController.findById);
router.patch('/:id', authMiddleware, AiDocumentAnalysisController.update);
router.delete('/:id', authMiddleware, AiDocumentAnalysisController.delete);

export default router;
