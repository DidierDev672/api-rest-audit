import { Router } from 'express';
import { TinnitusAnalysisController } from '../controllers';

const router = Router();

router.post('/', TinnitusAnalysisController.create);
router.get('/', TinnitusAnalysisController.findAll);
router.get('/patient/:patientId', TinnitusAnalysisController.findByPatientId);
router.get('/questionnaire/:questionnaireId', TinnitusAnalysisController.findByQuestionnaireId);
router.get('/response/:responseId', TinnitusAnalysisController.findByResponseId);
router.get('/:id', TinnitusAnalysisController.findById);
router.put('/:id', TinnitusAnalysisController.update);
router.delete('/:id', TinnitusAnalysisController.delete);

export default router;