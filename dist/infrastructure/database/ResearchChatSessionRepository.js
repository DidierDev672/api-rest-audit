"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResearchChatSessionRepository = void 0;
const supabase_1 = require("../database/supabase");
const Logger_1 = require("../logger/Logger");
class ResearchChatSessionRepository {
    constructor() {
        this.sessionsTable = 'research_chat_sessions';
        this.messagesTable = 'research_chat_messages';
        this.metadataTable = 'research_chat_session_metadata';
    }
    async createSessionWithMessages(researchId, session, metadata) {
        Logger_1.Logger.info('Creando chat session', { researchId, title: session.title });
        const now = new Date();
        const sessionId = crypto.randomUUID();
        const { data: sessionData, error: sessionError } = await supabase_1.supabase
            .from(this.sessionsTable)
            .insert({
            id: sessionId,
            research_id: researchId,
            title: session.title,
            original_description: session.originalDescription,
            summary: session.summary,
            tags: session.tags,
            created_at: now,
            updated_at: now,
        })
            .select()
            .single();
        if (sessionError) {
            Logger_1.Logger.danger('Error al crear chat session', { error: sessionError.message });
            throw new Error(sessionError.message);
        }
        if (session.messages && session.messages.length > 0) {
            const messagesData = session.messages.map(msg => ({
                session_id: sessionId,
                role: msg.role,
                content: msg.content,
                timestamp: msg.timestamp,
            }));
            const { error: messagesError } = await supabase_1.supabase
                .from(this.messagesTable)
                .insert(messagesData);
            if (messagesError) {
                Logger_1.Logger.danger('Error al crear mensajes', { error: messagesError.message });
                throw new Error(messagesError.message);
            }
        }
        let savedMetadata = null;
        if (metadata) {
            const { data: metadataData, error: metadataError } = await supabase_1.supabase
                .from(this.metadataTable)
                .insert({
                session_id: sessionId,
                total_messages: metadata.totalMessages,
                total_user_messages: metadata.totalUserMessages,
                total_assistant_messages: metadata.totalAssistantMessages,
                duration: metadata.duration,
                ai_model: metadata.aiModel,
            })
                .select()
                .single();
            if (metadataError) {
                Logger_1.Logger.danger('Error al crear metadata', { error: metadataError.message });
            }
            else {
                savedMetadata = this.mapMetadataToEntity(metadataData);
            }
        }
        Logger_1.Logger.success('Chat session creada', { sessionId });
        return {
            session: this.mapSessionToEntity(sessionData),
            metadata: savedMetadata,
        };
    }
    async findByResearchId(researchId) {
        Logger_1.Logger.info('Obteniendo chat sessions por research ID', { researchId });
        const { data, error } = await supabase_1.supabase
            .from(this.sessionsTable)
            .select('*')
            .eq('research_id', researchId)
            .order('created_at', { ascending: false });
        if (error) {
            Logger_1.Logger.danger('Error al obtener chat sessions', { error: error.message });
            throw new Error(error.message);
        }
        const sessions = await Promise.all((data || []).map(async (session) => {
            const { data: messages } = await supabase_1.supabase
                .from(this.messagesTable)
                .select('*')
                .eq('session_id', session.id)
                .order('timestamp', { ascending: true });
            return {
                ...this.mapSessionToEntity(session),
                messages: (messages || []).map(msg => ({
                    role: msg.role,
                    content: msg.content,
                    timestamp: msg.timestamp,
                })),
            };
        }));
        return sessions;
    }
    async findById(sessionId) {
        Logger_1.Logger.info('Buscando chat session por ID', { sessionId });
        const { data, error } = await supabase_1.supabase
            .from(this.sessionsTable)
            .select('*')
            .eq('id', sessionId)
            .single();
        if (error) {
            if (error.code === 'PGRST116') {
                Logger_1.Logger.warn('Chat session no encontrada', { sessionId });
                return null;
            }
            Logger_1.Logger.danger('Error al buscar chat session', { error: error.message });
            throw new Error(error.message);
        }
        const { data: messages } = await supabase_1.supabase
            .from(this.messagesTable)
            .select('*')
            .eq('session_id', sessionId)
            .order('timestamp', { ascending: true });
        Logger_1.Logger.success('Chat session encontrada', { sessionId });
        return {
            ...this.mapSessionToEntity(data),
            messages: (messages || []).map(msg => ({
                role: msg.role,
                content: msg.content,
                timestamp: msg.timestamp,
            })),
        };
    }
    mapSessionToEntity(data) {
        return {
            researchId: data.research_id,
            title: data.title,
            originalDescription: data.original_description,
            messages: [],
            summary: data.summary,
            tags: data.tags,
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at),
        };
    }
    mapMetadataToEntity(data) {
        return {
            sessionId: data.session_id,
            totalMessages: data.total_messages,
            totalUserMessages: data.total_user_messages,
            totalAssistantMessages: data.total_assistant_messages,
            duration: data.duration,
            aiModel: data.ai_model,
        };
    }
}
exports.ResearchChatSessionRepository = ResearchChatSessionRepository;
//# sourceMappingURL=ResearchChatSessionRepository.js.map