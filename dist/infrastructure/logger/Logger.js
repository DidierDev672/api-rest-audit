"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel["INFO"] = "INFO";
    LogLevel["SUCCESS"] = "SUCCESS";
    LogLevel["WARNING"] = "WARNING";
    LogLevel["DANGER"] = "DANGER";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    info: '\x1b[36m',
    success: '\x1b[32m',
    warning: '\x1b[33m',
    danger: '\x1b[31m',
};
class Logger {
    static formatMessage(level, message, meta) {
        const timestamp = new Date().toISOString();
        const color = this.getColor(level);
        const metaStr = meta ? ` | ${JSON.stringify(meta)}` : '';
        return `${colors.bright}${color}[${timestamp}] ${level}:${colors.reset} ${message}${metaStr}`;
    }
    static getColor(level) {
        switch (level) {
            case LogLevel.INFO:
                return colors.info;
            case LogLevel.SUCCESS:
                return colors.success;
            case LogLevel.WARNING:
                return colors.warning;
            case LogLevel.DANGER:
                return colors.danger;
            default:
                return colors.info;
        }
    }
    static info(message, meta) {
        console.log(this.formatMessage(LogLevel.INFO, message, meta));
    }
    static success(message, meta) {
        console.log(this.formatMessage(LogLevel.SUCCESS, message, meta));
    }
    static warning(message, meta) {
        console.warn(this.formatMessage(LogLevel.WARNING, message, meta));
    }
    static danger(message, meta) {
        console.error(this.formatMessage(LogLevel.DANGER, message, meta));
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map