import { GetState, SetState } from 'zustand'

import caller from '@/renderer/ipc-caller'

import type { StoreState, AccountSlice } from '../types'

const createAccountSlice = (
  set: SetState<StoreState>,
  get: GetState<StoreState>
): AccountSlice => ({
  mode: null,
  isAuth: false,
  isPending: true,
  isVisible: true,
  setMode: mode => {
    set(state => ({ ...state, mode }))
  },
  checkMode: async () => {
    const mode = await caller.getCurrentMode()
    set(state => ({ ...state, mode }))
  },
  toggleVisible: () => {
    set(state => ({ ...state, isVisible: !state.isVisible }))
  },
})

export default createAccountSlice
