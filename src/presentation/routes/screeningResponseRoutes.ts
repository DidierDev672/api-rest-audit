/**
 * Routes - Screening Response
 * Entry points for tamizaje responses API
 */

import { Router } from 'express';
import { ScreeningResponseController } from '../controllers';

const router = Router();

router.post('/', ScreeningResponseController.create);
router.get('/all', ScreeningResponseController.getAll);
router.get('/:id', ScreeningResponseController.getById);
router.put('/:id', ScreeningResponseController.update);
router.delete('/:id', ScreeningResponseController.delete);
router.get('/patient/:patientId', ScreeningResponseController.getByPatient);
router.get('/screening/:screeningId', ScreeningResponseController.getByScreening);
router.post('/validate', ScreeningResponseController.validate);

export default router;
