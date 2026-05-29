import { Router } from 'express';
import { NotePackageController } from '../controllers/NotePackageController';

const router = Router();

router.post('/', NotePackageController.create);
router.get('/', NotePackageController.findAll);
router.get('/analysis-logs', NotePackageController.findAnalysisLogs);
router.post('/analysis-logs', NotePackageController.createAnalysisLog);
router.get('/:id', NotePackageController.findById);

export default router;
