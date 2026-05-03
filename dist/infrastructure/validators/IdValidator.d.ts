export declare class IdValidator {
    static validate(id: string, entityName: string): void;
    static validateOptional(id: string | undefined, entityName: string): void;
}
export declare class RequestValidator {
    static validateDTO<T>(schema: any, data: T, entityName: string): void;
}
//# sourceMappingURL=IdValidator.d.ts.map