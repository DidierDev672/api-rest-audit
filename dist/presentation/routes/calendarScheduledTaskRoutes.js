"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CalendarScheduledTaskController_1 = require("../controllers/CalendarScheduledTaskController");
const n8nWebhookMiddleware_1 = require("../../infrastructure/middleware/n8nWebhookMiddleware");
const router = (0, express_1.Router)();
router.get('/notifications', CalendarScheduledTaskController_1.CalendarScheduledTaskController.findAllNotifications);
router.get('/notifications/:id', CalendarScheduledTaskController_1.CalendarScheduledTaskController.findNotificationById);
router.post('/process-due', n8nWebhookMiddleware_1.n8nWebhookMiddleware, CalendarScheduledTaskController_1.CalendarScheduledTaskController.processDue);
router.get('/', CalendarScheduledTaskController_1.CalendarScheduledTaskController.findAll);
router.get('/:id', CalendarScheduledTaskController_1.CalendarScheduledTaskController.findById);
router.post('/', CalendarScheduledTaskController_1.CalendarScheduledTaskController.create);
router.patch('/:id', CalendarScheduledTaskController_1.CalendarScheduledTaskController.update);
router.delete('/:id', CalendarScheduledTaskController_1.CalendarScheduledTaskController.delete);
exports.default = router;
//# sourceMappingURL=calendarScheduledTaskRoutes.js.map