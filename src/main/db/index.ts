import path from 'path'
import Sqlite, { Database } from 'better-sqlite3'

const DATABASE_PATH =
  process.env.NODE_ENV === 'production'
    ? path.join(process.resourcesPath, 'application.db')
    : path.join(__dirname, 'application.db')

const db: Database = new Sqlite(DATABASE_PATH)

export default db
