import type {
  Item,
  ParsedItem,
  UpdateItemPayload,
  EditableItemVariables,
  AccountMode,
} from '@/typings'

interface IPCCaller {
  getCurrentMode: () => Promise<AccountMode>
  initPassword: (value: string) => Promise<string>

  listItems: () => Promise<ParsedItem[]>
  readItem: (id: string) => Promise<ParsedItem | null>
  createItem: (variables: EditableItemVariables) => Promise<boolean>
  updateItem: (payload: UpdateItemPayload) => Promise<boolean>
  deleteItem: (id: string) => Promise<boolean>
}

const ipc = global.window.electron.ipcRenderer

const caller: IPCCaller = {
  getCurrentMode: async () => {
    const res = await ipc.callMain('current-mode')
    return res as AccountMode
  },
  initPassword: async value => {
    const res = await ipc.callMain('init-password', value)
    return res as string
  },

  listItems: async () => {
    const res = await ipc.callMain('list-items')
    return res as ParsedItem[]
  },
  readItem: async (id: string) => {
    const res = await ipc.callMain('read-item', id)
    return res as ParsedItem | null
  },
  createItem: async variables => {
    const res = await ipc.callMain('create-item', variables)
    return res as boolean
  },
  updateItem: async payload => {
    const res = await ipc.callMain('update-item', payload)
    return res as boolean
  },
  deleteItem: async (id: string) => {
    const res = await ipc.callMain('delete-item', id)
    return res as boolean
  },
}

export default Object.freeze(caller)
