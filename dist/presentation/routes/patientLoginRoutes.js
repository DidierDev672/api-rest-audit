"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post('/register', controllers_1.PatientLoginController.register);
router.post('/login', controllers_1.PatientLoginController.login);
router.post('/logout', controllers_1.PatientLoginController.logout);
router.get('/validate', controllers_1.PatientLoginController.validateToken);
exports.default = router;
//# sourceMappingURL=patientLoginRoutes.js.map