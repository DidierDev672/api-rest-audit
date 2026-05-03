import { Router } from 'express';
import { TinnitusNoteController } from '../controllers';

const router = Router();

router.post('/', TinnitusNoteController.create);
router.get('/', TinnitusNoteController.findAll);
router.get('/patient/:patientId', TinnitusNoteController.findByPatient);
router.get('/questionnaire/:questionnaireId', TinnitusNoteController.findByQuestionnaire);
router.get('/response/:responseId', TinnitusNoteController.findByResponse);
router.get('/:id', TinnitusNoteController.findById);
router.put('/:id', TinnitusNoteController.update);
router.delete('/:id', TinnitusNoteController.delete);

export default router;