import { ipcMain } from 'electron-better-ipc'

import { UpdateItemPayload, EditableItemVariables } from '@/typings'

import ItemController from '../controller/item'

export default function ItemListener() {
  ipcMain.answerRenderer('list-items', async () => {
    const result = await ItemController.findAll()
    return result
  })

  ipcMain.answerRenderer('read-item', async (id: string) => {
    const result = await ItemController.findById(id)
    return result
  })

  ipcMain.answerRenderer(
    'create-item',
    async (variables: EditableItemVariables) => {
      try {
        await ItemController.createOne(variables)
        return true
      } catch (err) {
        return false
      }
    }
  )

  ipcMain.answerRenderer('delete-item', async (id: string) => {
    try {
      await ItemController.deleteOne(id)
      return true
    } catch (err) {
      return false
    }
  })

  ipcMain.answerRenderer('update-item', async (payload: UpdateItemPayload) => {
    try {
      await ItemController.updateOne(payload)
      return true
    } catch (err) {
      return false
    }
  })
}
