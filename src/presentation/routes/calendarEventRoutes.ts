import { Router } from 'express';
import { CalendarEventController } from '../controllers';
import { CalendarScheduledTaskController } from '../controllers/CalendarScheduledTaskController';

const router = Router();

router.get('/', CalendarEventController.findAll);
router.get('/:eventId/scheduled-tasks', CalendarScheduledTaskController.findAll);
router.post('/:eventId/scheduled-tasks', CalendarScheduledTaskController.create);
router.get('/:id', CalendarEventController.findById);
router.post('/', CalendarEventController.create);
router.patch('/:id', CalendarEventController.update);
router.delete('/:id', CalendarEventController.delete);

export default router;
