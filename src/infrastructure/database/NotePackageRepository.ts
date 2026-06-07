import { v4 as uuidv4 } from 'uuid';
import { supabase } from './supabase';
import { Logger } from '../logger/Logger';

export interface NotePackageRow {
  id: string;
  title: string;
  description: string | null;
  note_count: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface NotePackageItemRow {
  id: string;
  note_package_id: string;
  subject: string;
  content: string;
  color: string;
  color_name: string;
  created_at: string;
  updated_at: string;
}

export interface NotePackageAnalysisLogRow {
  id: string;
  note_package_id: string;
  analysis: string;
  note_count: number;
  model: string | null;
  analyzed_at: string;
  created_at: string;
  updated_at: string;
}

export class NotePackageRepository {
  private readonly packagesTable = 'note_packages';
  private readonly itemsTable = 'note_package_items';
  private readonly logsTable = 'note_package_analysis_logs';

  async createPackageWithNotes(input: {
    title: string;
    description?: string | null;
    createdBy?: string | null;
    notes: Array<{
      subject: string;
      content: string;
      color: string;
      color_name: string;
    }>;
  }): Promise<{ package: NotePackageRow; notes: NotePackageItemRow[] }> {
    const packageId = uuidv4();
    const now = new Date().toISOString();
    const noteCount = input.notes.length;

    const { data: pkg, error: pkgError } = await supabase
      .from(this.packagesTable)
      .insert({
        id: packageId,
        title: input.title.trim(),
        description: input.description?.trim() || null,
        note_count: noteCount,
        created_by: input.createdBy ?? null,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (pkgError) {
      Logger.danger('Error creando paquete de notas', { error: pkgError.message });
      throw new Error(pkgError.message);
    }

    if (noteCount === 0) {
      return { package: pkg as NotePackageRow, notes: [] };
    }

    const itemRows = input.notes.map((note) => ({
      id: uuidv4(),
      note_package_id: packageId,
      subject: note.subject.trim(),
      content: note.content.trim(),
      color: note.color,
      color_name: note.color_name,
      created_at: now,
      updated_at: now,
    }));

    const { data: items, error: itemsError } = await supabase
      .from(this.itemsTable)
      .insert(itemRows)
      .select();

    if (itemsError) {
      await supabase.from(this.packagesTable).delete().eq('id', packageId);
      throw new Error(itemsError.message);
    }

    return {
      package: pkg as NotePackageRow,
      notes: (items ?? []) as NotePackageItemRow[],
    };
  }

  async findAllPackages(): Promise<NotePackageRow[]> {
    const { data, error } = await supabase
      .from(this.packagesTable)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []) as NotePackageRow[];
  }

  async findPackageById(id: string): Promise<NotePackageRow | null> {
    const { data, error } = await supabase
      .from(this.packagesTable)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return (data as NotePackageRow) ?? null;
  }

  async findNotesByPackageId(packageId: string): Promise<NotePackageItemRow[]> {
    const { data, error } = await supabase
      .from(this.itemsTable)
      .select('*')
      .eq('note_package_id', packageId)
      .order('created_at', { ascending: true });

    if (error) throw new Error(error.message);
    return (data ?? []) as NotePackageItemRow[];
  }

  async createAnalysisLog(input: {
    notePackageId: string;
    analysis: string;
    noteCount: number;
    model?: string | null;
    analyzedAt?: Date;
  }): Promise<NotePackageAnalysisLogRow> {
    const id = uuidv4();
    const now = new Date();
    const analyzedAt = input.analyzedAt ?? now;

    const { data, error } = await supabase
      .from(this.logsTable)
      .insert({
        id,
        note_package_id: input.notePackageId,
        analysis: input.analysis,
        note_count: input.noteCount,
        model: input.model ?? null,
        analyzed_at: analyzedAt.toISOString(),
        created_at: now.toISOString(),
        updated_at: now.toISOString(),
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as NotePackageAnalysisLogRow;
  }

  async findAnalysisLogsByPackageId(
    packageId: string,
  ): Promise<NotePackageAnalysisLogRow[]> {
    const { data, error } = await supabase
      .from(this.logsTable)
      .select('*')
      .eq('note_package_id', packageId)
      .order('analyzed_at', { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []) as NotePackageAnalysisLogRow[];
  }

  async deletePackageById(id: string): Promise<boolean> {
    const { error, count } = await supabase
      .from(this.packagesTable)
      .delete({ count: 'exact' })
      .eq('id', id);

    if (error) throw new Error(error.message);
    return (count ?? 0) > 0;
  }

  async findNoteById(
    packageId: string,
    noteId: string,
  ): Promise<NotePackageItemRow | null> {
    const { data, error } = await supabase
      .from(this.itemsTable)
      .select('*')
      .eq('id', noteId)
      .eq('note_package_id', packageId)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return (data as NotePackageItemRow) ?? null;
  }

  private async syncPackageNoteCount(packageId: string): Promise<number> {
    const notes = await this.findNotesByPackageId(packageId);
    const noteCount = notes.length;
    const now = new Date().toISOString();

    const { error } = await supabase
      .from(this.packagesTable)
      .update({ note_count: noteCount, updated_at: now })
      .eq('id', packageId);

    if (error) throw new Error(error.message);
    return noteCount;
  }

  async updateNoteItem(input: {
    packageId: string;
    noteId: string;
    subject: string;
    content: string;
    color: string;
    color_name: string;
  }): Promise<NotePackageItemRow> {
    const existing = await this.findNoteById(input.packageId, input.noteId);
    if (!existing) {
      throw new Error('Nota no encontrada en este paquete');
    }

    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from(this.itemsTable)
      .update({
        subject: input.subject.trim(),
        content: input.content.trim(),
        color: input.color,
        color_name: input.color_name,
        updated_at: now,
      })
      .eq('id', input.noteId)
      .eq('note_package_id', input.packageId)
      .select()
      .single();

    if (error) throw new Error(error.message);

    await supabase
      .from(this.packagesTable)
      .update({ updated_at: now })
      .eq('id', input.packageId);

    return data as NotePackageItemRow;
  }

  async addNoteToPackage(input: {
    packageId: string;
    subject: string;
    content: string;
    color: string;
    color_name: string;
  }): Promise<NotePackageItemRow> {
    const id = uuidv4();
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from(this.itemsTable)
      .insert({
        id,
        note_package_id: input.packageId,
        subject: input.subject.trim(),
        content: input.content.trim(),
        color: input.color,
        color_name: input.color_name,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (error) {
      Logger.danger('Error agregando nota al paquete', { error: error.message });
      throw new Error(error.message);
    }

    await this.syncPackageNoteCount(input.packageId);
    return data as NotePackageItemRow;
  }

  async deleteNoteItem(packageId: string, noteId: string): Promise<boolean> {
    const existing = await this.findNoteById(packageId, noteId);
    if (!existing) return false;

    const { error, count } = await supabase
      .from(this.itemsTable)
      .delete({ count: 'exact' })
      .eq('id', noteId)
      .eq('note_package_id', packageId);

    if (error) throw new Error(error.message);
    if ((count ?? 0) === 0) return false;

    await this.syncPackageNoteCount(packageId);
    return true;
  }
}
