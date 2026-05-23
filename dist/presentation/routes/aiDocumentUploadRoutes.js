"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const AiDocumentUploadController_1 = require("../controllers/AiDocumentUploadController");
const authMiddleware_1 = require("../../infrastructure/middleware/authMiddleware");
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: { fileSize: 52 * 1024 * 1024 },
});
const router = (0, express_1.Router)();
router.get('/', authMiddleware_1.authMiddleware, AiDocumentUploadController_1.AiDocumentUploadController.findAll);
router.post('/', authMiddleware_1.authMiddleware, upload.single('file'), AiDocumentUploadController_1.AiDocumentUploadController.create);
router.get('/:id', authMiddleware_1.authMiddleware, AiDocumentUploadController_1.AiDocumentUploadController.findById);
router.post('/:id/queue-analysis', authMiddleware_1.authMiddleware, AiDocumentUploadController_1.AiDocumentUploadController.queueAnalysis);
exports.default = router;
//# sourceMappingURL=aiDocumentUploadRoutes.js.map