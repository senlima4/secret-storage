import sqlite from 'sqlite3'
import path from 'path'

const sqlite3 = sqlite.verbose()

const DATABASE_PATH =
  process.env.NODE_ENV === 'production'
    ? path.join(process.resourcesPath, 'application.db')
    : path.join(__dirname, 'application.db')

const db = new sqlite3.Database(DATABASE_PATH)

export default db
