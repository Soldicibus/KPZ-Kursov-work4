import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const configSeed: DataSourceOptions = {
  type: "postgres",
  host: process.env.PG_HOST || "localhost",
  port: +(process.env.PG_PORT || 5432),
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "sus",
  database: process.env.POSTGRES_DB || "kpztest",
  logging: false,
  entities: ['src/orm/entities/**/*.ts'],
  migrations: ['src/orm/seeds/**/*{.ts,.js}'],
  namingStrategy: new SnakeNamingStrategy(),
};

export default new DataSource(configSeed);