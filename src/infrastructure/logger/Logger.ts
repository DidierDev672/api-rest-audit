export enum LogLevel {
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  DANGER = 'DANGER',
}

const neon = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  italic: '\x1b[3m',
  // Cyberpunk neon palette (true color)
  pink: '\x1b[38;2;255;0;128m',
  cyan: '\x1b[38;2;0;212;255m',
  green: '\x1b[38;2;0;255;65m',
  yellow: '\x1b[38;2;255;215;0m',
  red: '\x1b[38;2;255;0;85m',
  purple: '\x1b[38;2;175;0;255m',
  orange: '\x1b[38;2;255;107;0m',
  white: '\x1b[38;2;224;224;224m',
  gray: '\x1b[38;2;128;128;128m',
  // Background glows
  bgPink: '\x1b[48;2;255;0;128m',
  bgCyan: '\x1b[48;2;0;212;255m',
  bgGreen: '\x1b[48;2;0;255;65m',
  bgYellow: '\x1b[48;2;255;215;0m',
  bgRed: '\x1b[48;2;255;0;85m',
};

const levelStyle: Record<LogLevel, { badge: string; color: string; bg: string; icon: string }> = {
  [LogLevel.INFO]:    { badge: ' INFO ',   color: neon.cyan,   bg: neon.bgCyan,   icon: '\u25B6' },
  [LogLevel.SUCCESS]: { badge: ' OK ',     color: neon.green,  bg: neon.bgGreen,  icon: '\u2714' },
  [LogLevel.WARNING]: { badge: ' WARN ',   color: neon.yellow, bg: neon.bgYellow, icon: '\u26A1' },
  [LogLevel.DANGER]:  { badge: ' FAIL ',   color: neon.red,    bg: neon.bgRed,    icon: '\u2718' },
};

function formatTimestamp(): string {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  const ms = String(now.getMilliseconds()).padStart(3, '0');
  return `${neon.gray}${hh}:${mm}:${ss}${neon.dim}.${ms}${neon.reset}`;
}

function divider(char = '\u2501', len = 2): string {
  return `${neon.dim}${neon.gray}${char.repeat(len)}${neon.reset}`;
}

export class Logger {
  private static formatMessage(level: LogLevel, message: string, meta?: any): string {
    const style = levelStyle[level];
    const metaStr = meta ? ` ${divider()} ${neon.purple}${JSON.stringify(meta)}${neon.reset}` : '';

    return [
      `${neon.reset}${style.color}${neon.bold}${style.icon}${neon.reset}`,
      `${neon.dim}${neon.gray}[${neon.reset}`,
      formatTimestamp(),
      `${neon.dim}${neon.gray}]${neon.reset}`,
      `${divider()}`,
      `${style.bg}${neon.bold}${neon.white}${style.badge}${neon.reset}`,
      `${divider('\u2501', 1)}`,
      `${style.color}${neon.bold}${message}${neon.reset}`,
      metaStr,
    ].join('');
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
