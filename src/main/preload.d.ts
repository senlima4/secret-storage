import { RendererProcessIpc } from 'electron-better-ipc'

declare global {
  interface Window {
    electron: {
      myPing: () => Promise<void>
      ipcRenderer: Pick<RendererProcessIpc, 'callMain'>
    }
  }
}
