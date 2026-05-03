import { supabase } from '../database/supabase';
import { ResearchNote } from '../../domain/entities';
import { ResearchNoteRepository as IResearchNoteRepository } from '../../domain/repositories';
import { Logger } from '../logger/Logger';

export class ResearchNoteRepository implements IResearchNoteRepository {
  private readonly table = 'research_notes';

  async create(note: {
    id: string;
    research_id: string;
    id_note: string;
    text: string;
    color: string;
    color_name: string;
  }): Promise<void> {
    Logger.info('Creando nota de investigacion', { id: note.id, research_id: note.research_id });

    const { error } = await supabase
      .from(this.table)
      .insert({
        id: note.id,
        research_id: note.research_id,
        id_note: note.id_note,
        text: note.text,
        color: note.color,
        color_name: note.color_name,
      });

    if (error) {
      Logger.danger('Error al crear nota de investigacion', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Nota de investigacion creada');
  }

  async findByResearchId(researchId: string): Promise<ResearchNote[]> {
    Logger.info('Obteniendo notas por research ID', { researchId });

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('research_id', researchId)
      .order('created_at', { ascending: false });

    if (error) {
      Logger.danger('Error al obtener notas de investigacion', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Notas de investigacion obtenidas', { count: data.length });
    return data.map(this.mapToEntity);
  }

  async deleteByResearchId(researchId: string): Promise<void> {
    Logger.info('Eliminando notas por research ID', { researchId });

    const { error } = await supabase
      .from(this.table)
      .delete()
      .eq('research_id', researchId);

    if (error) {
      Logger.danger('Error al eliminar notas de investigacion', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Notas de investigacion eliminadas');
  }

  private mapToEntity(data: any): ResearchNote {
    return {
      researchId: data.research_id,
      idNote: data.id_note,
      text: data.text,
      color: data.color,
      colorName: data.color_name,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }
}