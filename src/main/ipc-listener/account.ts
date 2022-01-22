import { ipcMain } from 'electron-better-ipc'

import AccountController from '../controller/account'

export default function AccountListener() {
  ipcMain.answerRenderer('current-mode', () => {
    return AccountController.getMode()
  })

  ipcMain.answerRenderer('switch-mode', (mode: string) => {
    const isSame = AccountController.isMode(mode)
    if (mode === 'reset' || isSame) return

    AccountController.switchMode(mode)
  })

  ipcMain.answerRenderer('init-password', (value: string) => {
    const isInit = AccountController.isMode('init')
    if (!isInit) return 'error.invalide-mode'

    return AccountController.setKey(value)
  })

  ipcMain.answerRenderer('reset-request', async (word: string) => {
    try {
      const isPass = await AccountController.verifySecureWord(word)
      if (isPass) AccountController.switchMode('reset')
      return true
    } catch {
      return false
    }
  })

  ipcMain.answerRenderer('reset-password', async (value: string) => {
    const isReset = AccountController.isMode('reset')
    if (!isReset) return 'error.invalide-mode'

    return AccountController.setKey(value)
  })
}
