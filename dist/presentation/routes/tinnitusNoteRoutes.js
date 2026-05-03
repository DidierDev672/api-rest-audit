"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post('/', controllers_1.TinnitusNoteController.create);
router.get('/', controllers_1.TinnitusNoteController.findAll);
router.get('/patient/:patientId', controllers_1.TinnitusNoteController.findByPatient);
router.get('/questionnaire/:questionnaireId', controllers_1.TinnitusNoteController.findByQuestionnaire);
router.get('/response/:responseId', controllers_1.TinnitusNoteController.findByResponse);
router.get('/:id', controllers_1.TinnitusNoteController.findById);
router.put('/:id', controllers_1.TinnitusNoteController.update);
router.delete('/:id', controllers_1.TinnitusNoteController.delete);
exports.default = router;
//# sourceMappingURL=tinnitusNoteRoutes.js.map