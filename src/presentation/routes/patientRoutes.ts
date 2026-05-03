import { Router } from 'express';
import { PatientController } from '../controllers';

const router = Router();

router.post('/', PatientController.create);
router.get('/', PatientController.findAll);
router.get('/:id', PatientController.findById);
router.put('/:id', PatientController.update);
router.delete('/:id', PatientController.delete);

export default router;
