import * as uuid from 'uuid'

import { EditableItemVariables, UpdateItemPayload } from '@/typings'

import db from '../db'
import { Item, ITEM_STMT } from '../db/item'

interface IItemController {
  createOne: (variables: EditableItemVariables) => Promise<void>
  updateOne: (payload: UpdateItemPayload) => Promise<void>
  deleteOne: (id: string) => Promise<void>
  findAll: () => Promise<Item[]>
  findById: (id: string) => Promise<Item | null>
}

const controller: IItemController = {
  async createOne({ title, about, value }) {
    const stmt = db.prepare(ITEM_STMT.INSERT)
    stmt.run(
      uuid.v4(),
      title,
      about || null,
      JSON.stringify(value),
      new Date().getTime()
    )
  },
  async updateOne({ id, variables: { title, about, value } }) {
    const stmt = db.prepare(ITEM_STMT.UPDATE)
    stmt.run(
      title,
      about || null,
      JSON.stringify(value),
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
  async findById(id) {
    let result: Item | null = null

    const stmt = db.prepare(ITEM_STMT.GET_BY_ID)
    stmt.get(id, (err, row: Item) => {
      if (err) throw err
      result = row
    })

    return result
  },
}

export default Object.freeze(controller)
