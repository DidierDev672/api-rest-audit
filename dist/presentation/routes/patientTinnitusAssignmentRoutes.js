"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post('/', controllers_1.PatientTinnitusAssignmentController.assign);
router.get('/patient/:idPatient', controllers_1.PatientTinnitusAssignmentController.getByPatient);
router.get('/:id', controllers_1.PatientTinnitusAssignmentController.getById);
router.delete('/:id', controllers_1.PatientTinnitusAssignmentController.delete);
router.delete('/patient/:idPatient', controllers_1.PatientTinnitusAssignmentController.deleteByPatient);
router.post('/validate', controllers_1.PatientTinnitusAssignmentController.validate);
router.get('/check/patient/:idPatient', controllers_1.PatientTinnitusAssignmentController.checkPatientExists);
router.get('/check/tinnitus/:idTinnitus', controllers_1.PatientTinnitusAssignmentController.checkTinnitusExists);
exports.default = router;
//# sourceMappingURL=patientTinnitusAssignmentRoutes.js.map