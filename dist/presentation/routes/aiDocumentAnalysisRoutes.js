"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AiDocumentAnalysisController_1 = require("../controllers/AiDocumentAnalysisController");
const authMiddleware_1 = require("../../infrastructure/middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/', authMiddleware_1.authMiddleware, AiDocumentAnalysisController_1.AiDocumentAnalysisController.findAll);
router.post('/', authMiddleware_1.authMiddleware, AiDocumentAnalysisController_1.AiDocumentAnalysisController.create);
router.get('/:id', authMiddleware_1.authMiddleware, AiDocumentAnalysisController_1.AiDocumentAnalysisController.findById);
router.get('/document-upload/:documentUploadId', authMiddleware_1.authMiddleware, AiDocumentAnalysisController_1.AiDocumentAnalysisController.findByDocumentUploadId);
exports.default = router;
//# sourceMappingURL=aiDocumentAnalysisRoutes.js.map