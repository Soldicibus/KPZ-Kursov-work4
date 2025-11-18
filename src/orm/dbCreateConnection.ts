import { AppDataSource } from "../database/data-source";
import { logger } from '../utils/logger';

export const dbCreateConnection = async () => {
  const start = Date.now();
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      const duration = Date.now() - start;
      // Avoid logging sensitive information like password
      const opts: any = AppDataSource.options || {};
      const host = opts.host || 'unknown';
      const port = opts.port || 'unknown';
      const database = opts.database || 'unknown';
      logger.info('Database connection established', { host, port, database, durationMs: duration });
    } else {
      logger.debug('AppDataSource already initialized');
    }

    return AppDataSource;
  } catch (err: any) {
    logger.error('Database connection error', { message: err.message || err });
    throw err;
  }
};
