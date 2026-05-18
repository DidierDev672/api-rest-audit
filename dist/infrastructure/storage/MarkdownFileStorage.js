"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownStorageProvider = exports.MarkdownFileStorage = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
class MarkdownFileStorage {
    constructor(baseDir) {
        this.baseDir = baseDir;
    }
    async save(filename, content) {
        const safeFilename = path_1.default.basename(filename).replace(/[<>:"|?*]/g, '_');
        if (!safeFilename.toLowerCase().endsWith('.md')) {
            throw new Error('El nombre del archivo debe tener extensión .md');
        }
        await fs_1.promises.mkdir(this.baseDir, { recursive: true });
        const absolutePath = path_1.default.join(this.baseDir, safeFilename);
        await fs_1.promises.writeFile(absolutePath, content, 'utf-8');
        return {
            filename: safeFilename,
            path: absolutePath,
        };
    }
}
exports.MarkdownFileStorage = MarkdownFileStorage;
class MarkdownStorageProvider {
    static create() {
        const baseDir = process.env.N8N_MARKDOWN_STORAGE_PATH?.trim() ||
            path_1.default.join(process.cwd(), 'storage', 'n8n-markdown');
        return new MarkdownFileStorage(baseDir);
    }
}
exports.MarkdownStorageProvider = MarkdownStorageProvider;
//# sourceMappingURL=MarkdownFileStorage.js.map