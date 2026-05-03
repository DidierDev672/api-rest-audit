import { Router } from 'express';
import { TinnitusResponseController } from '../controllers';

const router = Router();

router.post('/', TinnitusResponseController.create);
router.get('/', TinnitusResponseController.findAll);
router.get('/patient/:patientId', TinnitusResponseController.findByPatientId);
router.get('/questionnaire/:questionnaireId', TinnitusResponseController.findByQuestionnaireId);
router.get('/:id', TinnitusResponseController.findById);
router.put('/:id', TinnitusResponseController.update);
router.delete('/:id', TinnitusResponseController.delete);

export default router;