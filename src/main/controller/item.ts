import * as uuid from 'uuid'

import {
  ParsedItem,
  ItemValueNode,
  EditableItemVariables,
  UpdateItemPayload,
} from '@/typings'

import db from '../db'
import { Item, ITEM_STMT } from '../db/item'

interface IItemController {
  createOne: (variables: EditableItemVariables) => Promise<void>
  updateOne: (payload: UpdateItemPayload) => Promise<void>
  deleteOne: (id: string) => Promise<void>
  findAll: () => ParsedItem[]
  findById: (id: string) => Promise<ParsedItem | null>
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
  findAll() {
    const stmt = db.prepare(ITEM_STMT.GET_ALL)
    const raw = stmt.all() as Item[]

    const result: ParsedItem[] = raw.map(item => ({
      ...item,
      value: JSON.parse(item.value) as ItemValueNode[],
    }))
    return result
  },
  async findById(id) {
    const stmt = db.prepare(ITEM_STMT.GET_BY_ID)
    const raw = stmt.get(id) as Item

    return {
      ...raw,
      value: JSON.parse(raw.value) as ItemValueNode[],
    }
  },
}

export default Object.freeze(controller)
