"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post('/', controllers_1.ScreeningController.create);
router.get('/', controllers_1.ScreeningController.findAll);
router.get('/:id', controllers_1.ScreeningController.findById);
router.put('/:id', controllers_1.ScreeningController.update);
router.delete('/:id', controllers_1.ScreeningController.delete);
exports.default = router;
//# sourceMappingURL=screeningRoutes.js.map