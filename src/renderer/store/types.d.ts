import type { ParsedItem, EditableItemVariables, AccountMode } from '@/typings'

export interface ItemSlice {
  items: ParsedItem[]
  focusId: string | null
  setFocusId: (id: string | null) => void
  allItem: () => Promise<void>
  createItem: (item: EditableItemVariables) => Promise<void>
  updateItem: (id: string, item: EditableItemVariables) => Promise<void>
  deleteItem: (id: string) => Promise<void>
}

export interface AccountSlice {
  mode: AccountMode | null
  isAuth: boolean
  isPending: boolean
  isVisible: boolean
  setMode: (mode: AccountMode) => void
  checkMode: () => Promise<void>
  toggleVisible: () => void
}

export type StoreState = AccountSlice & ItemSlice
