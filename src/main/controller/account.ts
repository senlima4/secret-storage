import * as argon2 from 'argon2'

import AccountStore from '../store/account'

import { generateSecretWord } from '../utils/get-random'

interface IEntryController {
  getMode: () => string
  isMode: (mode: string) => boolean
  switchMode: (mode: string) => void
  isSettled: () => boolean
  setKey: (key: string, resetMode?: boolean) => Promise<string>
  verifySecureWord: (word: string) => Promise<boolean>
}

const AccountController: IEntryController = {
  getMode() {
    return AccountStore.get('mode') as string
  },
  isMode(mode) {
    const result = mode === (AccountStore.get('mode') as string)
    return result
  },
  switchMode(mode) {
    AccountStore.set('mode', mode)
  },
  isSettled() {
    return AccountStore.has('password')
  },
  async setKey(key) {
    const secureWord = generateSecretWord()

    AccountStore.set('password', await argon2.hash(key))
    AccountStore.set('secureWord', await argon2.hash(secureWord))
    AccountStore.set('mode', 'default')

    return secureWord
  },
  verifySecureWord: async word => {
    const hashed = AccountStore.get('secureWord')
    if (!hashed) throw new Error('error.secure-word-not-set')

    const result = await argon2.verify(hashed as string, word)
    return result
  },
}

export default Object.freeze(AccountController)
