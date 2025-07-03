const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  onNewNote: (callback) => ipcRenderer.on('new-note', callback),
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
});