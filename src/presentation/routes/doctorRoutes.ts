import { Router } from 'express';
import { DoctorController } from '../controllers';

const router = Router();

router.post('/', DoctorController.create);
router.get('/', DoctorController.findAll);
router.get('/:id', DoctorController.findById);
router.put('/:id', DoctorController.update);
router.delete('/:id', DoctorController.delete);

export default router;
