const { contextBridge } = require('electron')
const { ipcRenderer } = require('electron-better-ipc')

contextBridge.exposeInMainWorld('electron', {
  async myPing() {
    const result = await ipcRenderer.callMain('ipc-example', 'ping')
    console.log(result)
  },
  ipcRenderer: {
    callMain: ipcRenderer.callMain,
  },
})
