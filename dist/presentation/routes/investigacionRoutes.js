"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post('/', controllers_1.InvestigacionController.create);
router.get('/', controllers_1.InvestigacionController.findAll);
router.get('/list/:id_resource', controllers_1.InvestigacionController.listByIdResource);
router.get('/:id', controllers_1.InvestigacionController.findById);
router.put('/:id', controllers_1.InvestigacionController.update);
router.delete('/:id', controllers_1.InvestigacionController.delete);
exports.default = router;
//# sourceMappingURL=investigacionRoutes.js.map