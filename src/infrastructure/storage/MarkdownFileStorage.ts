import { promises as fs } from 'fs';
import path from 'path';

export interface MarkdownSaveResult {
  filename: string;
  path: string;
}

export class MarkdownFileStorage {
  constructor(private readonly baseDir: string) {}

  async save(filename: string, content: string): Promise<MarkdownSaveResult> {
    const safeFilename = path.basename(filename).replace(/[<>:"|?*]/g, '_');

    if (!safeFilename.toLowerCase().endsWith('.md')) {
      throw new Error('El nombre del archivo debe tener extensión .md');
    }

    await fs.mkdir(this.baseDir, { recursive: true });

    const absolutePath = path.join(this.baseDir, safeFilename);
    await fs.writeFile(absolutePath, content, 'utf-8');

    return {
      filename: safeFilename,
      path: absolutePath,
    };
  }
}

export class MarkdownStorageProvider {
  static create(): MarkdownFileStorage {
    const baseDir =
      process.env.N8N_MARKDOWN_STORAGE_PATH?.trim() ||
      path.join(process.cwd(), 'storage', 'n8n-markdown');

    return new MarkdownFileStorage(baseDir);
  }
}
