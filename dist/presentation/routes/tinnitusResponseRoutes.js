"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post('/', controllers_1.TinnitusResponseController.create);
router.get('/', controllers_1.TinnitusResponseController.findAll);
router.get('/patient/:patientId', controllers_1.TinnitusResponseController.findByPatientId);
router.get('/questionnaire/:questionnaireId', controllers_1.TinnitusResponseController.findByQuestionnaireId);
router.get('/:id', controllers_1.TinnitusResponseController.findById);
router.put('/:id', controllers_1.TinnitusResponseController.update);
router.delete('/:id', controllers_1.TinnitusResponseController.delete);
exports.default = router;
//# sourceMappingURL=tinnitusResponseRoutes.js.map