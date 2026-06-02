import { Request, Response } from 'express';
import { z, ZodError } from 'zod';
import { NotePackageRepository } from '../../infrastructure/database/NotePackageRepository';
import { Logger } from '../../infrastructure/logger/Logger';

const repo = new NotePackageRepository();

const NoteItemSchema = z.object({
  subject: z.string().min(1, 'El asunto es requerido'),
  content: z.string().min(1, 'El contenido es requerido'),
  color: z.string().min(1),
  color_name: z.string().min(1),
});

const CreatePackageSchema = z.object({
  title: z.string().min(1, 'El título del paquete es requerido'),
  description: z.string().optional().nullable(),
  notes: z.array(NoteItemSchema).min(1, 'Agrega al menos una nota al paquete'),
});

const CreateAnalysisLogSchema = z.object({
  note_package_id: z.string().uuid(),
  analysis: z.string().min(1),
  note_count: z.number().int().min(1),
  model: z.string().optional().nullable(),
  analyzed_at: z.string().optional(),
});

const UpdateNoteItemSchema = z.object({
  subject: z.string().min(1, 'El asunto es requerido'),
  content: z.string().min(1, 'El contenido es requerido'),
  color: z.string().min(1),
  color_name: z.string().min(1),
});

function mapPackage(row: {
  id: string;
  title: string;
  description: string | null;
  note_count: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    noteCount: row.note_count,
    createdBy: row.created_by,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapNote(row: {
  id: string;
  note_package_id: string;
  subject: string;
  content: string;
  color: string;
  color_name: string;
  created_at: string;
  updated_at: string;
}) {
  return {
    id: row.id,
    notePackageId: row.note_package_id,
    subject: row.subject,
    content: row.content,
    color: row.color,
    colorName: row.color_name,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapLog(row: {
  id: string;
  note_package_id: string;
  analysis: string;
  note_count: number;
  model: string | null;
  analyzed_at: string;
  created_at: string;
  updated_at: string;
}) {
  return {
    id: row.id,
    notePackageId: row.note_package_id,
    analysis: row.analysis,
    noteCount: row.note_count,
    model: row.model,
    analyzedAt: row.analyzed_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export class NotePackageController {
  static async create(req: Request, res: Response) {
    try {
      const body = CreatePackageSchema.parse(req.body);
      const userId = (req as Request & { user?: { id?: string } }).user?.id ?? null;

      const result = await repo.createPackageWithNotes({
        title: body.title,
        description: body.description,
        createdBy: userId,
        notes: body.notes.map((n) => ({
          subject: n.subject,
          content: n.content,
          color: n.color,
          color_name: n.color_name,
        })),
      });

      res.status(201).json({
        package: mapPackage(result.package),
        notes: result.notes.map(mapNote),
      });
    } catch (error) {
      NotePackageController.handleError(error, res, 'create');
    }
  }

  static async findAll(_req: Request, res: Response) {
    try {
      const rows = await repo.findAllPackages();
      res.json(rows.map(mapPackage));
    } catch (error) {
      NotePackageController.handleError(error, res, 'findAll');
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const pkg = await repo.findPackageById(id);
      if (!pkg) {
        res.status(404).json({ error: 'Paquete de notas no encontrado' });
        return;
      }
      const notes = await repo.findNotesByPackageId(id);
      res.json({
        package: mapPackage(pkg),
        notes: notes.map(mapNote),
      });
    } catch (error) {
      NotePackageController.handleError(error, res, 'findById');
    }
  }

  static async deleteById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await repo.deletePackageById(id);
      if (!deleted) {
        res.status(404).json({ error: 'Paquete de notas no encontrado' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      NotePackageController.handleError(error, res, 'deleteById');
    }
  }

  static async updateNote(req: Request, res: Response) {
    try {
      const { id: packageId, noteId } = req.params;
      const body = UpdateNoteItemSchema.parse(req.body);

      const pkg = await repo.findPackageById(packageId);
      if (!pkg) {
        res.status(404).json({ error: 'Paquete de notas no encontrado' });
        return;
      }

      const updated = await repo.updateNoteItem({
        packageId,
        noteId,
        subject: body.subject,
        content: body.content,
        color: body.color,
        color_name: body.color_name,
      });

      res.json(mapNote(updated));
    } catch (error) {
      NotePackageController.handleError(error, res, 'updateNote');
    }
  }

  static async deleteNote(req: Request, res: Response) {
    try {
      const { id: packageId, noteId } = req.params;

      const pkg = await repo.findPackageById(packageId);
      if (!pkg) {
        res.status(404).json({ error: 'Paquete de notas no encontrado' });
        return;
      }

      const deleted = await repo.deleteNoteItem(packageId, noteId);
      if (!deleted) {
        res.status(404).json({ error: 'Nota no encontrada en este paquete' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      NotePackageController.handleError(error, res, 'deleteNote');
    }
  }

  static async createAnalysisLog(req: Request, res: Response) {
    try {
      const body = CreateAnalysisLogSchema.parse(req.body);
      const pkg = await repo.findPackageById(body.note_package_id);
      if (!pkg) {
        res.status(404).json({ error: 'Paquete de notas no encontrado' });
        return;
      }

      const log = await repo.createAnalysisLog({
        notePackageId: body.note_package_id,
        analysis: body.analysis,
        noteCount: body.note_count,
        model: body.model ?? null,
        analyzedAt: body.analyzed_at ? new Date(body.analyzed_at) : undefined,
      });

      res.status(201).json(mapLog(log));
    } catch (error) {
      NotePackageController.handleError(error, res, 'createAnalysisLog');
    }
  }

  static async findAnalysisLogs(req: Request, res: Response) {
    try {
      const packageId = req.query.note_package_id as string | undefined;
      if (!packageId) {
        res.status(400).json({ error: 'note_package_id es requerido' });
        return;
      }
      const logs = await repo.findAnalysisLogsByPackageId(packageId);
      res.json(logs.map(mapLog));
    } catch (error) {
      NotePackageController.handleError(error, res, 'findAnalysisLogs');
    }
  }

  private static handleError(error: unknown, res: Response, action: string) {
    if (error instanceof ZodError) {
      res.status(400).json({
        error: error.errors[0]?.message ?? 'Datos inválidos',
        details: error.errors,
      });
      return;
    }
    Logger.danger(`Error en NotePackageController.${action}`, {
      error: (error as Error).message,
    });
    res.status(500).json({ error: (error as Error).message });
  }
}
