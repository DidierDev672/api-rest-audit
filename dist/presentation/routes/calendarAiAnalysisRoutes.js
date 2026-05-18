"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post('/', controllers_1.CalendarAiAnalysisController.create);
router.get('/', controllers_1.CalendarAiAnalysisController.findAll);
router.get('/:id', controllers_1.CalendarAiAnalysisController.findById);
router.delete('/:id', controllers_1.CalendarAiAnalysisController.delete);
exports.default = router;
//# sourceMappingURL=calendarAiAnalysisRoutes.js.map