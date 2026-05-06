"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestigacionRepository = void 0;
const supabase_1 = require("../database/supabase");
class InvestigacionRepository {
    constructor() {
        this.table = 'investigaciones';
    }
    async create(data) {
        const now = new Date();
        const { data: result, error } = await supabase_1.supabase
            .from(this.table)
            .insert({
            id_resource: data.id_resource,
            content_resource: data.content_resource,
            created_at: now,
            updated_at: now
        })
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return this.mapToEntity(result);
    }
    async findAll() {
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .select('*')
            .order('created_at', { ascending: false });
        if (error)
            throw new Error(error.message);
        return data.map(this.mapToEntity);
    }
    async findById(id) {
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .select('*')
            .eq('id_resource', id)
            .single();
        if (error)
            return null;
        return this.mapToEntity(data);
    }
    mapToEntity(data) {
        return {
            id_resource: data.id_resource,
            content_resource: data.content_resource,
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at),
        };
    }
}
exports.InvestigacionRepository = InvestigacionRepository;
//# sourceMappingURL=InvestigacionRepository.js.map