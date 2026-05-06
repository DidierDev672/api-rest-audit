"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post('/', controllers_1.InvestigacionController.create);
router.get('/', controllers_1.InvestigacionController.findAll);
router.get('/:id', controllers_1.InvestigacionController.findById);
exports.default = router;
//# sourceMappingURL=investigacionRoutes.js.map