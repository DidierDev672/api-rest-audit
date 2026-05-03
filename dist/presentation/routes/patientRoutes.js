"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post('/', controllers_1.PatientController.create);
router.get('/', controllers_1.PatientController.findAll);
router.get('/:id', controllers_1.PatientController.findById);
router.put('/:id', controllers_1.PatientController.update);
router.delete('/:id', controllers_1.PatientController.delete);
exports.default = router;
//# sourceMappingURL=patientRoutes.js.map