// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')

// to make functions run in background by react components
// require('@electron/remote/main').initialize()
const path = require('path')
const { screen } = require('electron')

function createWindow () {
  // Create the browser window.
  const primaryDisplay = screen.getPrimaryDisplay()
  const {width ,height} = primaryDisplay.workAreaSize
  const mainWindow = new BrowserWindow({
    width,
    height,
    minHeight:700,
    minWidth:700,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js')
      // enableRemoteModule: true,
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL('http://localhost:3000')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.