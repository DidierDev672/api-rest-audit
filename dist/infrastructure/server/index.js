"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const auditoryResearchRoutes_1 = __importDefault(require("../../presentation/routes/auditoryResearchRoutes"));
const researchNoteRoutes_1 = __importDefault(require("../../presentation/routes/researchNoteRoutes"));
const tinnitusQuestionnaireRoutes_1 = __importDefault(require("../../presentation/routes/tinnitusQuestionnaireRoutes"));
const screeningRoutes_1 = __importDefault(require("../../presentation/routes/screeningRoutes"));
const relaxingSoundsRoutes_1 = __importDefault(require("../../presentation/routes/relaxingSoundsRoutes"));
const patientRoutes_1 = __importDefault(require("../../presentation/routes/patientRoutes"));
const patientScreeningAssignmentRoutes_1 = __importDefault(require("../../presentation/routes/patientScreeningAssignmentRoutes"));
const patientTinnitusAssignmentRoutes_1 = __importDefault(require("../../presentation/routes/patientTinnitusAssignmentRoutes"));
const patientLoginRoutes_1 = __importDefault(require("../../presentation/routes/patientLoginRoutes"));
const screeningResponseRoutes_1 = __importDefault(require("../../presentation/routes/screeningResponseRoutes"));
const screeningNoteRoutes_1 = __importDefault(require("../../presentation/routes/screeningNoteRoutes"));
const doctorRoutes_1 = __importDefault(require("../../presentation/routes/doctorRoutes"));
const doctorProfessionalDataRoutes_1 = __importDefault(require("../../presentation/routes/doctorProfessionalDataRoutes"));
const tinnitusResponseRoutes_1 = __importDefault(require("../../presentation/routes/tinnitusResponseRoutes"));
const tinnitusNoteRoutes_1 = __importDefault(require("../../presentation/routes/tinnitusNoteRoutes"));
const investigacionRoutes_1 = __importDefault(require("../../presentation/routes/investigacionRoutes"));
const researchAnalysisRoutes_1 = __importDefault(require("../../presentation/routes/researchAnalysisRoutes"));
const tinnitusAnalysisRoutes_1 = __importDefault(require("../../presentation/routes/tinnitusAnalysisRoutes"));
const tinnitusNotesAnalysisRoutes_1 = __importDefault(require("../../presentation/routes/tinnitusNotesAnalysisRoutes"));
const researchNoteAnalysisRoutes_1 = __importDefault(require("../../presentation/routes/researchNoteAnalysisRoutes"));
const calendarEventRoutes_1 = __importDefault(require("../../presentation/routes/calendarEventRoutes"));
const calendarAiAnalysisRoutes_1 = __importDefault(require("../../presentation/routes/calendarAiAnalysisRoutes"));
const calendarScheduledTaskRoutes_1 = __importDefault(require("../../presentation/routes/calendarScheduledTaskRoutes"));
const n8nRoutes_1 = __importDefault(require("../../presentation/routes/n8nRoutes"));
const CalendarTaskScheduler_1 = require("../scheduler/CalendarTaskScheduler");
const ResearchNoteAnalysisController_1 = require("../../presentation/controllers/ResearchNoteAnalysisController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const Logger_1 = require("../logger/Logger");
const errorHandler_1 = require("../middleware/errorHandler");
dotenv.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(errorHandler_1.requestLogger);
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Auditory API is running' });
});
app.use('/api/v1/research', auditoryResearchRoutes_1.default);
app.use('/api/v1/research-notes', researchNoteRoutes_1.default);
app.use('/api/v1/questionnaires', tinnitusQuestionnaireRoutes_1.default);
app.use('/api/v1/screenings', screeningRoutes_1.default);
app.use('/api/v1/relaxing-sounds', relaxingSoundsRoutes_1.default);
app.use('/api/v1/patients', patientRoutes_1.default);
app.use('/api/v1/assignments', patientScreeningAssignmentRoutes_1.default);
app.use('/api/v1/tinnitus-assignments', patientTinnitusAssignmentRoutes_1.default);
app.use('/api/v1/auth', patientLoginRoutes_1.default);
app.use('/api/v1/screening-responses', screeningResponseRoutes_1.default);
app.use('/api/v1/screening-notes', screeningNoteRoutes_1.default);
app.use('/api/v1/doctors', doctorRoutes_1.default);
app.use('/api/v1/doctor-professional-data', doctorProfessionalDataRoutes_1.default);
app.use('/api/v1/tinnitus-responses', tinnitusResponseRoutes_1.default);
app.use('/api/v1/tinnitus-notes', tinnitusNoteRoutes_1.default);
app.use('/api/v1/tinnitus-analysis', tinnitusAnalysisRoutes_1.default);
app.use('/api/v1/tinnitus-notes-analysis', tinnitusNotesAnalysisRoutes_1.default);
app.use('/api/v1/investigaciones', investigacionRoutes_1.default);
app.use('/api/v1/research-notes/analysis', researchNoteAnalysisRoutes_1.default);
app.get('/api/v1/research/:researchId/analysis', authMiddleware_1.authMiddleware, ResearchNoteAnalysisController_1.ResearchNoteAnalysisController.findByResearchId);
app.use('/api/v1/research-analysis', researchAnalysisRoutes_1.default);
app.use('/api/v1/calendar-events', calendarEventRoutes_1.default);
app.use('/api/v1/calendar-ai-analyses', calendarAiAnalysisRoutes_1.default);
app.use('/api/v1/calendar-scheduled-tasks', calendarScheduledTaskRoutes_1.default);
app.use('/api/v1/integrations/n8n', n8nRoutes_1.default);
app.use(errorHandler_1.notFoundHandler);
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => {
    Logger_1.Logger.success(`Servidor corriendo en puerto ${PORT}`);
    (0, CalendarTaskScheduler_1.startCalendarTaskScheduler)();
});
exports.default = app;
//# sourceMappingURL=index.js.map