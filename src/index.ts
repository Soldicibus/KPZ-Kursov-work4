import 'dotenv/config';
import 'reflect-metadata';
import fs from 'fs';
import path from 'path';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { AppDataSource } from "database/data-source";

import './utils/response/customSuccess';
import { logger } from './utils/logger';
//import { errorHandler } from './middleware/errorHandler';
import { getLanguage } from './middleware/getLanguage';
import { dbCreateConnection } from './orm/dbCreateConnection';
import routes from './routes';

export const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(getLanguage);

try {
  const accessLogStream = fs.createWriteStream(path.join(__dirname, '../log/access.log'), {
    flags: 'a',
  });
  app.use(morgan('combined', { stream: accessLogStream }));
} catch (err) {
  logger.error('Failed to create access log stream', { error: (err as any).message || err });
}
app.use(morgan('combined'));

app.use('/', routes);

//pp.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});

(async () => {
  await dbCreateConnection();
  AppDataSource.entityMetadatas.forEach((meta) => {
    logger.debug('Loaded entity', { name: meta.name, tableName: meta.tableName });
  });
})();
