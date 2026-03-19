import { DataSource } from 'typeorm'
import { Todo } from './entities/Todo'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE_PATH || './database.sqlite',
  entities: [Todo],
  synchronize: true,
  logging: false,
})

export async function getDataSource() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize()
  }
  return AppDataSource
}