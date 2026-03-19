import { DataSource } from 'typeorm';
import { Todo } from '../entities/Todo';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE_URL || './dev.db',
  entities: [Todo],
  synchronize: process.env.NODE_ENV !== 'production', // Auto-create tables in dev
  logging: false,
});

// Initialize the data source
export const initializeDatabase = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    console.log('Database initialized');
  }
  return AppDataSource;
};