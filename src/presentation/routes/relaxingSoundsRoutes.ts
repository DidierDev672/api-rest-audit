import { Router } from 'express';
import { RelaxingSoundController } from '../controllers';

const router = Router();

router.post('/', RelaxingSoundController.create);
router.get('/', RelaxingSoundController.findAll);
router.get('/:id', RelaxingSoundController.findById);
router.put('/:id', RelaxingSoundController.update);
router.delete('/:id', RelaxingSoundController.delete);

export default router;
