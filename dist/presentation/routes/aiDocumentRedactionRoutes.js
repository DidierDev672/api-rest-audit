"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AiDocumentRedactionController_1 = require("../controllers/AiDocumentRedactionController");
const router = (0, express_1.Router)();
router.get('/', AiDocumentRedactionController_1.AiDocumentRedactionController.findAll);
router.post('/', AiDocumentRedactionController_1.AiDocumentRedactionController.create);
router.get('/:id', AiDocumentRedactionController_1.AiDocumentRedactionController.findById);
router.put('/:id', AiDocumentRedactionController_1.AiDocumentRedactionController.update);
router.delete('/:id', AiDocumentRedactionController_1.AiDocumentRedactionController.delete);
router.get('/document-upload/:documentUploadId', AiDocumentRedactionController_1.AiDocumentRedactionController.findByDocumentUploadId);
exports.default = router;
//# sourceMappingURL=aiDocumentRedactionRoutes.js.map