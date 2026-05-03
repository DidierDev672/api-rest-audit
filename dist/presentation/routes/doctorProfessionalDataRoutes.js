"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post('/', controllers_1.DoctorProfessionalDataController.create);
router.get('/', controllers_1.DoctorProfessionalDataController.findAll);
router.get('/doctor/:doctorId', controllers_1.DoctorProfessionalDataController.findByDoctorId);
router.get('/:id', controllers_1.DoctorProfessionalDataController.findById);
router.put('/:id', controllers_1.DoctorProfessionalDataController.update);
router.delete('/:id', controllers_1.DoctorProfessionalDataController.delete);
exports.default = router;
//# sourceMappingURL=doctorProfessionalDataRoutes.js.map