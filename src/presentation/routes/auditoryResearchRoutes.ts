import { Router } from 'express';
import { AuditoryResearchController, ResearchChatSessionController } from '../controllers';

const router = Router();

router.post('/', AuditoryResearchController.create);
router.get('/', AuditoryResearchController.findAll);
router.get('/:id', AuditoryResearchController.findById);
router.put('/:id', AuditoryResearchController.update);
router.delete('/:id', AuditoryResearchController.delete);

router.post('/:idResearch/chat-sessions', ResearchChatSessionController.createSession);
router.get('/:idResearch/chat-sessions/:idSession', ResearchChatSessionController.findById);

export default router;
