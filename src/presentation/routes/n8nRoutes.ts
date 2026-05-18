import { Router } from 'express';
import { N8nIntegrationController } from '../controllers/N8nIntegrationController';
import { n8nWebhookMiddleware } from '../../infrastructure/middleware/n8nWebhookMiddleware';

const router = Router();

router.post('/send', n8nWebhookMiddleware, N8nIntegrationController.sendText);
router.post('/receive', n8nWebhookMiddleware, N8nIntegrationController.receiveText);
router.post(
  '/markdown/upload',
  n8nWebhookMiddleware,
  N8nIntegrationController.receiveText
);

export default router;
