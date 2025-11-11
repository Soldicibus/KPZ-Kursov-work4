import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PG_HOST || "localhost",
  port: +(process.env.PG_PORT || 5432),
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "sus",
  database: process.env.POSTGRES_DB || "kpztest",
  entities: [__dirname + "/../orm/entities/**/*.ts"],
  migrations: [__dirname + "/../orm/migrations/*.ts"],
  subscribers: [__dirname + "/../orm/subscriber/**/*.ts"],
  migrationsRun: true,
});
