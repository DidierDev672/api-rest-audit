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
router.post('/:id/notes', controllers_1.ResearchNoteController.createNotes);
router.post('/:id/chat-sessions', controllers_1.ResearchChatSessionController.createSession);
exports.default = router;
//# sourceMappingURL=auditoryResearchRoutes.js.map