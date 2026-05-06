"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post('/', controllers_1.ResearchNoteController.create);
router.get('/', controllers_1.ResearchNoteController.findAll);
router.get('/research/:researchId', controllers_1.ResearchNoteController.findByResearchId);
router.get('/:id', controllers_1.ResearchNoteController.findById);
router.put('/:id', controllers_1.ResearchNoteController.update);
router.delete('/:id', controllers_1.ResearchNoteController.delete);
exports.default = router;
//# sourceMappingURL=researchNoteRoutes.js.map