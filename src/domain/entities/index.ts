export interface Entity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ENTIDAD SENSIBLE - Análisis de Impacto Ético
 * 
 * Privacidad: Esta entidad contiene datos personales sensibles (nombre completo, documento, fecha de nacimiento).
 * El principio de Responsabilidad de Hans Jonas aplica: "Obra de tal modo que los efectos de tu acción sean compatibles 
 * con la permanencia de una vida humana auténtica".
 * 
 * Medidas implementadas:
 * - hasConsent: Validación obligatoria de consentimiento antes del procesamiento de datos.
 * - Minimización de datos: Solo se almacenan los datos estrictamente necesarios.
 * 
 * Primera Ley de la Robótica: Esta entidad no debe causar daño. Los datos de salud no deben ser utilizados 
 * para discriminación o exposición no autorizada.
 * 
 * Segunda Ley: Respeto a la privacidad del paciente. Los datos biomédicos requieren consentimiento explícito.
 */

export interface AuditoryResearch extends Entity {
  name: string;
  description: string;
}

export interface ResearchNote {
  researchId: string;
  idNote: string;
  text: string;
  color: string;
  colorName: string;
  createdAt: Date;
  updatedAt: Date;
  sourceMessageIndex?: number;
  sourceContent?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ResearchChatSession {
  researchId: string;
  title: string;
  originalDescription?: string;
  messages: ChatMessage[];
  summary?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ResearchChatSessionMetadata {
  sessionId: string;
  totalMessages: number;
  totalUserMessages: number;
  totalAssistantMessages: number;
  duration: number;
  aiModel?: string;
}

export interface Question {
  id?: string;
  title?: string;
  description?: string;
  sound?: string;
  optionsAnswer?: OptionAnswer[];
}

export interface OptionAnswer {
  id?: string;
  text: string;
  value: boolean | number;
}

export interface TinnitusQuestionnaire extends Entity {
  title: string;
  description: string;
  questions: Question[];
}

export interface Screening extends Entity {
  title: string;
  description: string;
  sound?: string;
  questions: Question[];
  optionsAnswer: OptionAnswer[];
}

export interface RelaxingSound extends Entity {
  title: string;
  description: string;
  sound: string;
}

export type DocumentType = 'Tarjeta de Identidad' | 'Cedula de ciudadania' | 'Pasaporte' | 'Tarjeta de extranjero';

export interface ParentInfo {
  fullName: string;
  age: number;
  diseases: string[];
}

export interface PatientFamilyData {
  father: ParentInfo;
  mother: ParentInfo;
}

export interface Patient extends Entity {
  fullName: string;
  documentType: DocumentType;
  documentNumber: string;
  birthDate: Date;
  height: number;
  weight: number;
  isAllergic: boolean;
  familyData: PatientFamilyData;
  hasConsent: boolean;
}

export interface PatientScreeningAssignment extends Entity {
  patientId: string;
  screeningIds: string[];
}

export interface PatientTinnitusAssignment extends Entity {
  idPatient: string;
  idTinnitusQuestionnaires: string;
  status: string;
}

export interface OptionAnswerResponse {
  id?: string;
  text: string;
  value: number;
}

export interface Answer {
  id?: string;
  title: string;
  description: string;
  optionsAnswer: OptionAnswerResponse[];
}

export interface TinnitusResponse extends Entity {
  idPatient: string;
  idTinnitusQuestionnaires: string;
  answer: Answer[];
}

export interface TinnitusNote extends Entity {
  idPatient: string;
  idTinnitusQuestionnaires: string;
  idTinnitusResponse: string;
  description: string;
  color?: string;
  source?: string;
}

export interface TinnitusAssignmentValidationResult {
  patientExists: boolean;
  tinnitusExists: boolean;
  patientMissing: boolean;
  tinnitusMissing: boolean;
}

export interface AssignmentValidationResult {
  patientExists: boolean;
  screeningExists: boolean[];
  missingScreeningIds: string[];
}

export interface ScreeningNote extends Entity {
  idPatient: string;
  idScreening: string;
  idDoctor: string;
  titleNote: string;
  descriptionNote: string;
}

export type DoctorDocumentType = 'CC' | 'CE' | 'PA' | 'TI';
export type Gender = 'M' | 'F' | 'Otro';
export type RegistrationStatus = 'active' | 'inactive' | 'suspended';

export interface Doctor extends Entity {
  documentType: DoctorDocumentType;
  documentNumber: string;
  fullName: string;
  birthDate: Date;
  gender: Gender;
  email: string;
  phone?: string;
  address?: string;
  isActive: boolean;
}

export interface DoctorCertification {
  name: string;
  institution: string;
  year: number;
}

export interface DoctorProfessionalData extends Entity {
  doctorId: string;
  professionalTitle: string;
  university: string;
  country: string;
  graduationYear: number;
  professionalCardNumber: string;
  rethusRegistration: string;
  registrationStatus: RegistrationStatus;
  medicalSpecialty?: string;
  subspecialty?: string;
  additionalCertifications: DoctorCertification[];
  diplomaUrl?: string;
  degreeCertificateUrl?: string;
  specialtyCertificatesUrl: string[];
  isVerified: boolean;
}

export interface Investigacion {
  id_resource: string;
  content_resource: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResearchAnalysis {
  id?: string;
  researchId: string;
  analysis: {
    summary: string;
    generatedAt: string;
    model: string;
  };
  notesCount: number;
  notesReferences: Array<{
    id: string;
    createdAt: string;
    updatedAt: string;
  }>;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ResearchNoteAnalysis extends Entity {
  researchId: string;
  analysisText: string;
  notesCount: number;
  source: string;
  modelName?: string;
  language: string;
  createdByUserId: string;
}

export * from './PatientLoginEntity'
export * from './AiDocumentAnalysisEntity'
export * from './AiDocumentRedactionEntity'

export interface TinnitusAnalysis extends Entity {
  idPatient: string;
  idTinnitusQuestionnaires: string;
  idTinnitusResponse: string;
  analysis: string;
  model: string;
}

export interface TinnitusNotesAnalysis extends Entity {
  idPatient: string;
  idTinnitusQuestionnaires?: string;
  idTinnitusResponse?: string;
  analysis: string;
  noteCount?: number;
  analyzedAt?: Date;
  createdBy?: string;
};

export interface CalendarEvent extends Entity {
  type: 'task' | 'research';
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  researchId: string | null;
}

export interface CalendarAiAnalysis extends Entity {
  calendarEventId: string;
  researchId: string | null;
  eventTitle: string;
  eventType: 'task' | 'research';
  eventDate: string;
  researchName: string | null;
  content: string;
  model: string | null;
  generatedAt: Date;
}

export interface CalendarScheduledTask extends Entity {
  calendarEventId: string | null;
  title: string;
  message: string;
  scheduledAt: Date;
  status: 'pending' | 'processing' | 'sent' | 'failed' | 'cancelled';
  channel: 'in_app' | 'webhook' | 'n8n';
  reminderMinutesBefore: number | null;
  metadata: Record<string, unknown>;
  sentAt: Date | null;
  lastError: string | null;
}

export interface CalendarNotification {
  id: string;
  scheduledTaskId: string | null;
  calendarEventId: string | null;
  title: string;
  message: string;
  channel: 'in_app' | 'webhook' | 'n8n';
  status: 'delivered' | 'failed';
  payload: Record<string, unknown>;
  deliveredAt: Date;
  createdAt: Date;
}
