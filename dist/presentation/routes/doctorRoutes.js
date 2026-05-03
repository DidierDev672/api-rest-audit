"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post('/', controllers_1.DoctorController.create);
router.get('/', controllers_1.DoctorController.findAll);
router.get('/:id', controllers_1.DoctorController.findById);
router.put('/:id', controllers_1.DoctorController.update);
router.delete('/:id', controllers_1.DoctorController.delete);
exports.default = router;
//# sourceMappingURL=doctorRoutes.js.map