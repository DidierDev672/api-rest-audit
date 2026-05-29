import { Router } from 'express';
import multer from 'multer';
import { AiDocumentUploadController } from '../controllers/AiDocumentUploadController';
import { authMiddleware } from '../../infrastructure/middleware/authMiddleware';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 52 * 1024 * 1024 },
});

const router = Router();

router.get('/', authMiddleware, AiDocumentUploadController.findAll);
router.post(
  '/',
  authMiddleware,
  upload.single('file'),
  AiDocumentUploadController.create,
);
router.get(
  '/:id/signed-url',
  authMiddleware,
  AiDocumentUploadController.getSignedUrl,
);
router.get('/:id', authMiddleware, AiDocumentUploadController.findById);
router.post(
  '/:id/queue-analysis',
  authMiddleware,
  AiDocumentUploadController.queueAnalysis,
);

export default router;
