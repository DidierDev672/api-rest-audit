"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post('/', controllers_1.TinnitusQuestionnaireController.create);
router.get('/', controllers_1.TinnitusQuestionnaireController.findAll);
router.get('/:id', controllers_1.TinnitusQuestionnaireController.findById);
router.put('/:id', controllers_1.TinnitusQuestionnaireController.update);
router.delete('/:id', controllers_1.TinnitusQuestionnaireController.delete);
exports.default = router;
//# sourceMappingURL=tinnitusQuestionnaireRoutes.js.map