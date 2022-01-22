import { GetState, SetState } from 'zustand'

import caller from '@/renderer/ipc-caller'

import type { StoreState, ItemSlice } from '../types'

const createItemSlice = (
  set: SetState<StoreState>,
  get: GetState<StoreState>
): ItemSlice => ({
  items: [],
  focusId: null,
  setFocusId: id => {
    set(state => ({ ...state, focusId: id }))
  },
  allItem: async () => {
    const items = await caller.listItems()
    set(state => ({ ...state, items }))
  },
  createItem: async item => {
    await caller.createItem(item)
  },
  updateItem: async (id, item) => {
    await caller.updateItem({ id, variables: item })
  },
  deleteItem: async id => {
    await caller.deleteItem(id)
    set(state => ({ ...state, focusId: null }))
  },
})

export default createItemSlice
