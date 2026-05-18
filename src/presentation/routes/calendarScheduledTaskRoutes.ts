import { Router } from 'express';
import { CalendarScheduledTaskController } from '../controllers/CalendarScheduledTaskController';
import { n8nWebhookMiddleware } from '../../infrastructure/middleware/n8nWebhookMiddleware';

const router = Router();

router.get('/notifications', CalendarScheduledTaskController.findAllNotifications);
router.get(
  '/notifications/:id',
  CalendarScheduledTaskController.findNotificationById
);
router.post(
  '/process-due',
  n8nWebhookMiddleware,
  CalendarScheduledTaskController.processDue
);
router.get('/', CalendarScheduledTaskController.findAll);
router.get('/:id', CalendarScheduledTaskController.findById);
router.post('/', CalendarScheduledTaskController.create);
router.patch('/:id', CalendarScheduledTaskController.update);
router.delete('/:id', CalendarScheduledTaskController.delete);

export default router;
