"use strict";
/**
 * Routes - Screening Response
 * Entry points for tamizaje responses API
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post('/', controllers_1.ScreeningResponseController.create);
router.get('/all', controllers_1.ScreeningResponseController.getAll);
router.get('/:id', controllers_1.ScreeningResponseController.getById);
router.put('/:id', controllers_1.ScreeningResponseController.update);
router.delete('/:id', controllers_1.ScreeningResponseController.delete);
router.get('/patient/:patientId', controllers_1.ScreeningResponseController.getByPatient);
router.get('/screening/:screeningId', controllers_1.ScreeningResponseController.getByScreening);
router.post('/validate', controllers_1.ScreeningResponseController.validate);
exports.default = router;
//# sourceMappingURL=screeningResponseRoutes.js.map