export enum LogLevel {
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  DANGER = 'DANGER',
}

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  info: '\x1b[36m',
  success: '\x1b[32m',
  warning: '\x1b[33m',
  danger: '\x1b[31m',
};

export class Logger {
  private static formatMessage(level: LogLevel, message: string, meta?: any): string {
    const timestamp = new Date().toISOString();
    const color = this.getColor(level);
    const metaStr = meta ? ` | ${JSON.stringify(meta)}` : '';
    
    return `${colors.bright}${color}[${timestamp}] ${level}:${colors.reset} ${message}${metaStr}`;
  }

  private static getColor(level: LogLevel): string {
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

  static info(message: string, meta?: any): void {
    console.log(this.formatMessage(LogLevel.INFO, message, meta));
  }

  static success(message: string, meta?: any): void {
    console.log(this.formatMessage(LogLevel.SUCCESS, message, meta));
  }

  static warning(message: string, meta?: any): void {
    console.warn(this.formatMessage(LogLevel.WARNING, message, meta));
  }

  static danger(message: string, meta?: any): void {
    console.error(this.formatMessage(LogLevel.DANGER, message, meta));
  }
}
