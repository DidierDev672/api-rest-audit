import { Router } from 'express';
import { AiDocumentAnalysisController } from '../controllers/AiDocumentAnalysisController';
import { authMiddleware } from '../../infrastructure/middleware/authMiddleware';

const router = Router();

router.get('/', authMiddleware, AiDocumentAnalysisController.findAll);
router.post('/', authMiddleware, AiDocumentAnalysisController.create);
router.get('/:id', authMiddleware, AiDocumentAnalysisController.findById);
router.get('/document-upload/:documentUploadId', authMiddleware, AiDocumentAnalysisController.findByDocumentUploadId);

export default router;
