"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post('/', controllers_1.ResearchAnalysisController.create);
router.get('/:id', controllers_1.ResearchAnalysisController.findById);
router.get('/research/:researchId', controllers_1.ResearchAnalysisController.findByResearchId);
router.put('/:id', controllers_1.ResearchAnalysisController.update);
router.delete('/:id', controllers_1.ResearchAnalysisController.delete);
router.delete('/research/:researchId', controllers_1.ResearchAnalysisController.deleteByResearchId);
exports.default = router;
//# sourceMappingURL=researchAnalysisRoutes.js.map