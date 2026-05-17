import { Router } from 'express';
import { CalendarEventController } from '../controllers';

const router = Router();

router.get('/', CalendarEventController.findAll);
router.get('/:id', CalendarEventController.findById);
router.post('/', CalendarEventController.create);
router.patch('/:id', CalendarEventController.update);
router.delete('/:id', CalendarEventController.delete);

export default router;
