import { ipcMain } from 'electron-better-ipc'

import ItemController, {
  EditItemVariables,
  UpdateItemPayload,
} from '../controller/item'

export default function ItemListener() {
  ipcMain.answerRenderer('list-items', async () => {
    const result = await ItemController.findAll()
    return result
  })

  ipcMain.answerRenderer(
    'create-item',
    async (variables: EditItemVariables) => {
      try {
        const result = await ItemController.createOne(variables)
        return result
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
      const result = await ItemController.updateOne(
        payload.id,
        payload.variables
      )
      return result
    } catch (err) {
      return false
    }
  })
}
