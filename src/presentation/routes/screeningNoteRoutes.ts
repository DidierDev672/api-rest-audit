import { Router } from 'express';
import { ScreeningNoteController } from '../controllers';

const router = Router();

router.post('/', ScreeningNoteController.create);
router.get('/', ScreeningNoteController.findAll);
router.get('/patient/:patientId', ScreeningNoteController.findByPatient);
router.get('/screening/:screeningId', ScreeningNoteController.findByScreening);
router.get('/:id', ScreeningNoteController.findById);
router.put('/:id', ScreeningNoteController.update);
router.delete('/:id', ScreeningNoteController.delete);

export default router;
