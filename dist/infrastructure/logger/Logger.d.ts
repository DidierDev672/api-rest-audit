export declare enum LogLevel {
    INFO = "INFO",
    SUCCESS = "SUCCESS",
    WARNING = "WARNING",
    DANGER = "DANGER"
}
export declare class Logger {
    private static formatMessage;
    static info(message: string, meta?: any): void;
    static success(message: string, meta?: any): void;
    static warning(message: string, meta?: any): void;
    static danger(message: string, meta?: any): void;
}
//# sourceMappingURL=Logger.d.ts.map