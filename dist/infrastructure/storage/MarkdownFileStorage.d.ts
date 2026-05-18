export interface MarkdownSaveResult {
    filename: string;
    path: string;
}
export declare class MarkdownFileStorage {
    private readonly baseDir;
    constructor(baseDir: string);
    save(filename: string, content: string): Promise<MarkdownSaveResult>;
}
export declare class MarkdownStorageProvider {
    static create(): MarkdownFileStorage;
}
//# sourceMappingURL=MarkdownFileStorage.d.ts.map