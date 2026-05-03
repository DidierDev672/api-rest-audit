"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post('/', controllers_1.ScreeningNoteController.create);
router.get('/', controllers_1.ScreeningNoteController.findAll);
router.get('/patient/:patientId', controllers_1.ScreeningNoteController.findByPatient);
router.get('/screening/:screeningId', controllers_1.ScreeningNoteController.findByScreening);
router.get('/:id', controllers_1.ScreeningNoteController.findById);
router.put('/:id', controllers_1.ScreeningNoteController.update);
router.delete('/:id', controllers_1.ScreeningNoteController.delete);
exports.default = router;
//# sourceMappingURL=screeningNoteRoutes.js.map