import * as uuid from 'uuid'
import * as argon2 from 'argon2'

import db from '../db'
import { Item, ITEM_STMT } from '../db/item'

export interface EditItemVariables {
  title: string
  about?: string
  value: string
}

export interface UpdateItemPayload {
  id: string
  variables: EditItemVariables
}

interface IItemController {
  createOne: (variables: EditItemVariables) => Promise<void>
  updateOne: (id: string, variables: EditItemVariables) => Promise<void>
  deleteOne: (id: string) => Promise<void>
  findAll: () => Promise<Item[]>
}

const controller: IItemController = {
  async createOne({ title, about, value }) {
    const stmt = db.prepare(ITEM_STMT.INSERT)

    stmt.run(
      uuid.v4(),
      title,
      about || null,
      await argon2.hash(value),
      new Date().getTime()
    )
  },
  async updateOne(id, { title, about, value }) {
    const stmt = db.prepare(ITEM_STMT.UPDATE)

    stmt.run(
      title,
      about || null,
      await argon2.hash(value),
      new Date().getTime(),
      id
    )
  },
  async deleteOne(id) {
    const stmt = db.prepare(ITEM_STMT.REMOVE)
    stmt.run(id)
  },
  async findAll() {
    let result: Item[] = []
    const stmt = db.prepare(ITEM_STMT.GET_ALL)
    stmt.all((err, rows: Item[]) => {
      if (err) throw err
      result = rows
    })

    return result
  },
}

export default Object.freeze(controller)
