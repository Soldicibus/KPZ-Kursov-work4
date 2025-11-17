import { AppDataSource } from "../database/data-source";

export const dbCreateConnection = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log(
        `Database connection success. DB: '${AppDataSource.options.database}'`
      );
    }
    
    return AppDataSource;
  } catch (err) {
    console.error("Database connection error:", err);
    throw err;
  }
};
