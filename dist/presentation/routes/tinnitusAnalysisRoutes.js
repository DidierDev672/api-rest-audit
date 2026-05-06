"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post('/', controllers_1.TinnitusAnalysisController.create);
router.get('/', controllers_1.TinnitusAnalysisController.findAll);
router.get('/:id', controllers_1.TinnitusAnalysisController.findById);
router.get('/patient/:patientId', controllers_1.TinnitusAnalysisController.findByPatientId);
router.get('/questionnaire/:questionnaireId', controllers_1.TinnitusAnalysisController.findByQuestionnaireId);
router.get('/response/:responseId', controllers_1.TinnitusAnalysisController.findByResponseId);
router.put('/:id', controllers_1.TinnitusAnalysisController.update);
router.delete('/:id', controllers_1.TinnitusAnalysisController.delete);
exports.default = router;
//# sourceMappingURL=tinnitusAnalysisRoutes.js.map