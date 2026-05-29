import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import auditoryResearchRoutes from '../../presentation/routes/auditoryResearchRoutes';
import researchNoteRoutes from '../../presentation/routes/researchNoteRoutes';
import tinnitusQuestionnaireRoutes from '../../presentation/routes/tinnitusQuestionnaireRoutes';
import screeningRoutes from '../../presentation/routes/screeningRoutes';
import relaxingSoundsRoutes from '../../presentation/routes/relaxingSoundsRoutes';
import patientRoutes from '../../presentation/routes/patientRoutes';
import patientScreeningAssignmentRoutes from '../../presentation/routes/patientScreeningAssignmentRoutes';
import patientTinnitusAssignmentRoutes from '../../presentation/routes/patientTinnitusAssignmentRoutes';
import patientLoginRoutes from '../../presentation/routes/patientLoginRoutes';
import screeningResponseRoutes from '../../presentation/routes/screeningResponseRoutes';
import screeningNoteRoutes from '../../presentation/routes/screeningNoteRoutes';
import doctorRoutes from '../../presentation/routes/doctorRoutes';
import doctorProfessionalDataRoutes from '../../presentation/routes/doctorProfessionalDataRoutes';
import tinnitusResponseRoutes from '../../presentation/routes/tinnitusResponseRoutes';
import tinnitusNoteRoutes from '../../presentation/routes/tinnitusNoteRoutes';
import investigacionRoutes from '../../presentation/routes/investigacionRoutes';
import researchAnalysisRoutes from '../../presentation/routes/researchAnalysisRoutes';
import tinnitusAnalysisRoutes from '../../presentation/routes/tinnitusAnalysisRoutes';
import tinnitusNotesAnalysisRoutes from '../../presentation/routes/tinnitusNotesAnalysisRoutes';
import researchNoteAnalysisRoutes from '../../presentation/routes/researchNoteAnalysisRoutes';
import calendarEventRoutes from '../../presentation/routes/calendarEventRoutes';
import calendarAiAnalysisRoutes from '../../presentation/routes/calendarAiAnalysisRoutes';
import calendarAnalysisNoteRoutes from '../../presentation/routes/calendarAnalysisNoteRoutes';
import calendarAnalysisNoteAnalysisLogRoutes from '../../presentation/routes/calendarAnalysisNoteAnalysisLogRoutes';
import calendarScheduledTaskRoutes from '../../presentation/routes/calendarScheduledTaskRoutes';
import n8nRoutes from '../../presentation/routes/n8nRoutes';
import aiDocumentAnalysisRoutes from '../../presentation/routes/aiDocumentAnalysisRoutes';
import aiDocumentAnalysisNoteRoutes from '../../presentation/routes/aiDocumentAnalysisNoteRoutes';
import aiDocumentRedactionRoutes from '../../presentation/routes/aiDocumentRedactionRoutes';
import aiDocumentUploadRoutes from '../../presentation/routes/aiDocumentUploadRoutes';
import notePackageRoutes from '../../presentation/routes/notePackageRoutes';
import { startCalendarTaskScheduler } from '../scheduler/CalendarTaskScheduler';
import { ResearchNoteAnalysisController } from '../../presentation/controllers/ResearchNoteAnalysisController';
import { authMiddleware } from '../middleware/authMiddleware';
import { Logger } from '../logger/Logger';
import { errorHandler, notFoundHandler, requestLogger } from '../middleware/errorHandler';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Auditory API is running' });
});

app.use('/api/v1/research', auditoryResearchRoutes);
app.use('/api/v1/research-notes', researchNoteRoutes);
app.use('/api/v1/questionnaires', tinnitusQuestionnaireRoutes);
app.use('/api/v1/screenings', screeningRoutes);
app.use('/api/v1/relaxing-sounds', relaxingSoundsRoutes);
app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/assignments', patientScreeningAssignmentRoutes);
app.use('/api/v1/tinnitus-assignments', patientTinnitusAssignmentRoutes);
app.use('/api/v1/auth', patientLoginRoutes);
app.use('/api/v1/screening-responses', screeningResponseRoutes);
app.use('/api/v1/screening-notes', screeningNoteRoutes);
app.use('/api/v1/doctors', doctorRoutes);
app.use('/api/v1/doctor-professional-data', doctorProfessionalDataRoutes);
app.use('/api/v1/tinnitus-responses', tinnitusResponseRoutes);
app.use('/api/v1/tinnitus-notes', tinnitusNoteRoutes);
app.use('/api/v1/tinnitus-analysis', tinnitusAnalysisRoutes);
app.use('/api/v1/tinnitus-notes-analysis', tinnitusNotesAnalysisRoutes);
app.use('/api/v1/investigaciones', investigacionRoutes);
app.use('/api/v1/research-notes/analysis', researchNoteAnalysisRoutes);
app.get('/api/v1/research/:researchId/analysis', authMiddleware, ResearchNoteAnalysisController.findByResearchId);
app.use('/api/v1/research-analysis', researchAnalysisRoutes);
app.use('/api/v1/calendar-events', calendarEventRoutes);
app.use('/api/v1/calendar-ai-analyses', calendarAiAnalysisRoutes);
app.use('/api/v1/calendar-ai-analysis-notes', calendarAnalysisNoteRoutes);
app.use(
  '/api/v1/calendar-ai-analysis-note-analysis-logs',
  calendarAnalysisNoteAnalysisLogRoutes,
);
app.use('/api/v1/calendar-scheduled-tasks', calendarScheduledTaskRoutes);
app.use('/api/v1/integrations/n8n', n8nRoutes);
app.use('/api/v1/ai-document-uploads', aiDocumentUploadRoutes);
app.use('/api/v1/ai-document-analyses', aiDocumentAnalysisRoutes);
app.use('/api/v1/ai-document-analysis-notes', aiDocumentAnalysisNoteRoutes);
app.use('/api/v1/ai-document-redactions', aiDocumentRedactionRoutes);
app.use('/api/v1/note-packages', notePackageRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  Logger.success(`Servidor corriendo en puerto ${PORT}`);
  startCalendarTaskScheduler();
});

export default app;
