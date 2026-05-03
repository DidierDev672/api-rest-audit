"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TinnitusNoteRepository = void 0;
const uuid_1 = require("uuid");
const supabase_1 = require("../database/supabase");
const Logger_1 = require("../logger/Logger");
class TinnitusNoteRepository {
    constructor() {
        this.table = 'notes_tinnitus_responses';
    }
    async create(data) {
        const id = (0, uuid_1.v4)();
        const now = new Date();
        Logger_1.Logger.info('Creando nota de tinnitus', { patientId: data.idPatient, questionnaireId: data.idTinnitusQuestionnaires });
        const { data: result, error } = await supabase_1.supabase
            .from(this.table)
            .insert({
            id,
            id_patient: data.idPatient,
            id_tinnitus_questionnaires: data.idTinnitusQuestionnaires,
            id_tinnitus_response: data.idTinnitusResponse,
            description: data.description,
            created_at: now,
            updated_at: now,
        })
            .select()
            .single();
        if (error) {
            Logger_1.Logger.danger('Error al crear nota de tinnitus', { error: error.message });
            throw new Error(error.message);
        }
        Logger_1.Logger.success('Nota de tinnitus creada', { id });
        return this.mapToEntity(result);
    }
    async findAll() {
        Logger_1.Logger.info('Obteniendo todas las notas de tinnitus');
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .select('*')
            .order('created_at', { ascending: false });
        if (error) {
            Logger_1.Logger.danger('Error al obtener notas de tinnitus', { error: error.message });
            throw new Error(error.message);
        }
        Logger_1.Logger.success('Notas de tinnitus obtenidas', { count: data.length });
        return data.map(this.mapToEntity);
    }
    async findById(id) {
        Logger_1.Logger.info('Obteniendo nota de tinnitus por ID', { id });
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .select('*')
            .eq('id', id)
            .single();
        if (error) {
            Logger_1.Logger.warning('Nota de tinnitus no encontrada', { id });
            return null;
        }
        Logger_1.Logger.success('Nota de tinnitus obtenida', { id });
        return this.mapToEntity(data);
    }
    async findByPatientId(patientId) {
        Logger_1.Logger.info('Obteniendo notas de tinnitus por paciente', { patientId });
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .select('*')
            .eq('id_patient', patientId)
            .order('created_at', { ascending: false });
        if (error) {
            Logger_1.Logger.danger('Error al obtener notas de tinnitus por paciente', { error: error.message });
            throw new Error(error.message);
        }
        Logger_1.Logger.success('Notas de tinnitus por paciente obtenidas', { count: data.length, patientId });
        return data.map(this.mapToEntity);
    }
    async findByTinnitusQuestionnaireId(questionnaireId) {
        Logger_1.Logger.info('Obteniendo notas de tinnitus por cuestionario', { questionnaireId });
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .select('*')
            .eq('id_tinnitus_questionnaires', questionnaireId)
            .order('created_at', { ascending: false });
        if (error) {
            Logger_1.Logger.danger('Error al obtener notas de tinnitus por cuestionario', { error: error.message });
            throw new Error(error.message);
        }
        Logger_1.Logger.success('Notas de tinnitus por cuestionario obtenidas', { count: data.length, questionnaireId });
        return data.map(this.mapToEntity);
    }
    async findByTinnitusResponseId(responseId) {
        Logger_1.Logger.info('Obteniendo notas de tinnitus por respuesta', { responseId });
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .select('*')
            .eq('id_tinnitus_response', responseId)
            .order('created_at', { ascending: false });
        if (error) {
            Logger_1.Logger.danger('Error al obtener notas de tinnitus por respuesta', { error: error.message });
            throw new Error(error.message);
        }
        Logger_1.Logger.success('Notas de tinnitus por respuesta obtenidas', { count: data.length, responseId });
        return data.map(this.mapToEntity);
    }
    async update(id, data) {
        const now = new Date();
        Logger_1.Logger.info('Actualizando nota de tinnitus', { id });
        const updateData = { updated_at: now };
        if (data.idPatient !== undefined)
            updateData.id_patient = data.idPatient;
        if (data.idTinnitusQuestionnaires !== undefined)
            updateData.id_tinnitus_questionnaires = data.idTinnitusQuestionnaires;
        if (data.idTinnitusResponse !== undefined)
            updateData.id_tinnitus_response = data.idTinnitusResponse;
        if (data.description !== undefined)
            updateData.description = data.description;
        const { data: result, error } = await supabase_1.supabase
            .from(this.table)
            .update(updateData)
            .eq('id', id)
            .select()
            .single();
        if (error) {
            Logger_1.Logger.danger('Error al actualizar nota de tinnitus', { error: error.message });
            throw new Error(error.message);
        }
        Logger_1.Logger.success('Nota de tinnitus actualizada', { id });
        return this.mapToEntity(result);
    }
    async delete(id) {
        Logger_1.Logger.info('Eliminando nota de tinnitus', { id });
        const { error } = await supabase_1.supabase
            .from(this.table)
            .delete()
            .eq('id', id);
        if (error) {
            Logger_1.Logger.danger('Error al eliminar nota de tinnitus', { error: error.message });
            throw new Error(error.message);
        }
        Logger_1.Logger.success('Nota de tinnitus eliminada', { id });
    }
    mapToEntity(data) {
        return {
            id: data.id,
            idPatient: data.id_patient,
            idTinnitusQuestionnaires: data.id_tinnitus_questionnaires,
            idTinnitusResponse: data.id_tinnitus_response,
            description: data.description,
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at),
        };
    }
}
exports.TinnitusNoteRepository = TinnitusNoteRepository;
//# sourceMappingURL=TinnitusNoteRepository.js.map