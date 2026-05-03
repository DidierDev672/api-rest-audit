import { Router } from 'express';
import { PatientScreeningAssignmentController } from '../controllers';

const router = Router();

router.post('/', PatientScreeningAssignmentController.assign);
router.get('/patient/:patientId', PatientScreeningAssignmentController.getByPatient);
router.get('/:id', PatientScreeningAssignmentController.getById);
router.delete('/:id', PatientScreeningAssignmentController.delete);
router.delete('/patient/:patientId', PatientScreeningAssignmentController.deleteByPatient);
router.post('/validate', PatientScreeningAssignmentController.validate);
router.get('/check/patient/:patientId', PatientScreeningAssignmentController.checkPatientExists);
router.get('/check/screening/:screeningId', PatientScreeningAssignmentController.checkScreeningExists);

export default router;
