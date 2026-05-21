import { Router } from 'express';
import { AiDocumentRedactionController } from '../controllers/AiDocumentRedactionController';

const router = Router();

router.get('/', AiDocumentRedactionController.findAll);
router.post('/', AiDocumentRedactionController.create);
router.get('/:id', AiDocumentRedactionController.findById);
router.put('/:id', AiDocumentRedactionController.update);
router.delete('/:id', AiDocumentRedactionController.delete);
router.get('/document-upload/:documentUploadId', AiDocumentRedactionController.findByDocumentUploadId);

export default router;
