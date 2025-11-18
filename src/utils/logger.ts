const TIMESTAMP = () => new Date().toISOString();

function format(level: string, msg: string, meta?: any) {
  const base = `[${TIMESTAMP()}] [${level}] ${msg}`;
  if (!meta) return base;
  try {
    return `${base} ${typeof meta === 'string' ? meta : JSON.stringify(meta)}`;
  } catch (e) {
    return base;
  }
}

export const logger = {
  info: (msg: string, meta?: any) => console.info(format('INFO', msg, meta)),
  warn: (msg: string, meta?: any) => console.warn(format('WARN', msg, meta)),
  error: (msg: string, meta?: any) => console.error(format('ERROR', msg, meta)),
  debug: (msg: string, meta?: any) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(format('DEBUG', msg, meta));
    }
  },
};

export default logger;
