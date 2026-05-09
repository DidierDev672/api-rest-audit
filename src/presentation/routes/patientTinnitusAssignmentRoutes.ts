import { Router } from 'express';
import { PatientTinnitusAssignmentController } from '../controllers';

const router = Router();

router.post('/', PatientTinnitusAssignmentController.assign);
router.get('/patient/:idPatient', PatientTinnitusAssignmentController.getByPatient);
router.get('/:id', PatientTinnitusAssignmentController.getById);
router.delete('/:id', PatientTinnitusAssignmentController.delete);
router.delete('/patient/:idPatient', PatientTinnitusAssignmentController.deleteByPatient);
router.post('/validate', PatientTinnitusAssignmentController.validate);
router.get('/check/patient/:idPatient', PatientTinnitusAssignmentController.checkPatientExists);
router.get('/check/tinnitus/:idTinnitus', PatientTinnitusAssignmentController.checkTinnitusExists);
router.patch('/:id', PatientTinnitusAssignmentController.updateStatus);

export default router;
