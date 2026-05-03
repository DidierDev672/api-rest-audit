"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post('/', controllers_1.PatientScreeningAssignmentController.assign);
router.get('/patient/:patientId', controllers_1.PatientScreeningAssignmentController.getByPatient);
router.get('/:id', controllers_1.PatientScreeningAssignmentController.getById);
router.delete('/:id', controllers_1.PatientScreeningAssignmentController.delete);
router.delete('/patient/:patientId', controllers_1.PatientScreeningAssignmentController.deleteByPatient);
router.post('/validate', controllers_1.PatientScreeningAssignmentController.validate);
router.get('/check/patient/:patientId', controllers_1.PatientScreeningAssignmentController.checkPatientExists);
router.get('/check/screening/:screeningId', controllers_1.PatientScreeningAssignmentController.checkScreeningExists);
exports.default = router;
//# sourceMappingURL=patientScreeningAssignmentRoutes.js.map