"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const CalendarScheduledTaskController_1 = require("../controllers/CalendarScheduledTaskController");
const router = (0, express_1.Router)();
router.get('/', controllers_1.CalendarEventController.findAll);
router.get('/:eventId/scheduled-tasks', CalendarScheduledTaskController_1.CalendarScheduledTaskController.findAll);
router.post('/:eventId/scheduled-tasks', CalendarScheduledTaskController_1.CalendarScheduledTaskController.create);
router.get('/:id', controllers_1.CalendarEventController.findById);
router.post('/', controllers_1.CalendarEventController.create);
router.patch('/:id', controllers_1.CalendarEventController.update);
router.delete('/:id', controllers_1.CalendarEventController.delete);
exports.default = router;
//# sourceMappingURL=calendarEventRoutes.js.map