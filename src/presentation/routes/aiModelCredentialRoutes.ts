import { Router } from 'express';
import { AiModelCredentialController } from '../controllers/AiModelCredentialController';

const router = Router();

router.get('/', AiModelCredentialController.findAll);
router.post('/', AiModelCredentialController.create);
router.get('/owner/:ownerId', AiModelCredentialController.findByOwnerId);
router.post('/:id/test', AiModelCredentialController.test);
router.get('/:id', AiModelCredentialController.findById);
router.put('/:id', AiModelCredentialController.update);
router.delete('/:id', AiModelCredentialController.delete);

export default router;
