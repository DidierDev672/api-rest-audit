"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const N8nIntegrationController_1 = require("../controllers/N8nIntegrationController");
const n8nWebhookMiddleware_1 = require("../../infrastructure/middleware/n8nWebhookMiddleware");
const router = (0, express_1.Router)();
router.post('/send', n8nWebhookMiddleware_1.n8nWebhookMiddleware, N8nIntegrationController_1.N8nIntegrationController.sendText);
router.post('/receive', n8nWebhookMiddleware_1.n8nWebhookMiddleware, N8nIntegrationController_1.N8nIntegrationController.receiveText);
router.post('/markdown/upload', n8nWebhookMiddleware_1.n8nWebhookMiddleware, N8nIntegrationController_1.N8nIntegrationController.receiveText);
exports.default = router;
//# sourceMappingURL=n8nRoutes.js.map