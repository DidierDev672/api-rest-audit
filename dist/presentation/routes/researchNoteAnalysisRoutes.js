"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ResearchNoteAnalysisController_1 = require("../controllers/ResearchNoteAnalysisController");
const authMiddleware_1 = require("../../infrastructure/middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post('/', authMiddleware_1.authMiddleware, ResearchNoteAnalysisController_1.ResearchNoteAnalysisController.create);
router.get('/:id', authMiddleware_1.authMiddleware, ResearchNoteAnalysisController_1.ResearchNoteAnalysisController.findById);
exports.default = router;
//# sourceMappingURL=researchNoteAnalysisRoutes.js.map