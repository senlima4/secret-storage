import db from './index'

export interface Item {
  id: string
  title: string
  about: string | null
  value: string
  createdAt: number
  updatedAt: number | null
}

export const initItemModel = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS item (
      id        TEXT    PRIMARY KEY  NOT NULL,
      title     TEXT    NOT NULL     UNIQUE,
      about     TEXT    DEFAULT NULL,
      value     TEXT    NOT NULL,
      createdAt INTEGER NOT NULL,
      updatedAt INTEGER DEFAULT NULL
    );
  `)
}

export const ITEM_STMT = Object.freeze({
  INSERT:
    'INSERT INTO item (id, title, about, value, createdAt) VALUES (?, ?, ?, ?, ?, ?)',
  UPDATE:
    'UPDATE item SET title = ?, about = ?, value = ?, updatedAt = ? WHERE id = ?',
  REMOVE: 'DELETE FROM item WHERE id = ?',
  GET_BY_ID: 'SELECT * FROM item WHERE id = ?',
  GET_ALL: 'SELECT * FROM item',
})
