import { Router } from 'express';
import { InvestigacionController } from '../controllers';

const router = Router();

router.post('/', InvestigacionController.create);
router.get('/', InvestigacionController.findAll);
router.get('/:id', InvestigacionController.findById);
router.put('/:id', InvestigacionController.update);
router.delete('/:id', InvestigacionController.delete);

export default router;