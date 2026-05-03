import { Router } from 'express';
import { DoctorProfessionalDataController } from '../controllers';

const router = Router();

router.post('/', DoctorProfessionalDataController.create);
router.get('/', DoctorProfessionalDataController.findAll);
router.get('/doctor/:doctorId', DoctorProfessionalDataController.findByDoctorId);
router.get('/:id', DoctorProfessionalDataController.findById);
router.put('/:id', DoctorProfessionalDataController.update);
router.delete('/:id', DoctorProfessionalDataController.delete);

export default router;
