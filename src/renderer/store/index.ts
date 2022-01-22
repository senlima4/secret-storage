import create from 'zustand'

import type { StoreState } from './types'

import createAccountSlice from './slice/account'
import createItemSlice from './slice/item'

const useStore = create<StoreState>((set, get) => ({
  ...createAccountSlice(set, get),
  ...createItemSlice(set, get),
}))

export default useStore
