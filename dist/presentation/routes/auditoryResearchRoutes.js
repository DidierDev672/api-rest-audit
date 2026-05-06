"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post('/', controllers_1.AuditoryResearchController.create);
router.get('/', controllers_1.AuditoryResearchController.findAll);
router.get('/:id', controllers_1.AuditoryResearchController.findById);
router.put('/:id', controllers_1.AuditoryResearchController.update);
router.delete('/:id', controllers_1.AuditoryResearchController.delete);
router.post('/:idResearch/chat-sessions', controllers_1.ResearchChatSessionController.createSession);
router.get('/:idResearch/chat-sessions/:idSession', controllers_1.ResearchChatSessionController.findById);
exports.default = router;
//# sourceMappingURL=auditoryResearchRoutes.js.map