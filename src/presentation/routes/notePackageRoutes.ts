import { Router } from 'express';
import { NotePackageController } from '../controllers/NotePackageController';

const router = Router();

router.post('/', NotePackageController.create);
router.get('/', NotePackageController.findAll);
router.get('/analysis-logs', NotePackageController.findAnalysisLogs);
router.post('/analysis-logs', NotePackageController.createAnalysisLog);
router.patch('/:id/notes/:noteId', NotePackageController.updateNote);
router.delete('/:id/notes/:noteId', NotePackageController.deleteNote);
router.get('/:id', NotePackageController.findById);
router.delete('/:id', NotePackageController.deleteById);

export default router;
