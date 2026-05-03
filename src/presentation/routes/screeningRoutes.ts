import { Router } from 'express';
import { ScreeningController } from '../controllers';

const router = Router();

router.post('/', ScreeningController.create);
router.get('/', ScreeningController.findAll);
router.get('/:id', ScreeningController.findById);
router.put('/:id', ScreeningController.update);
router.delete('/:id', ScreeningController.delete);

export default router;
