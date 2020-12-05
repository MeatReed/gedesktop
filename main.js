// Modules to control application life and create native browser window
const path = require('path')
const https = require('https')
const fs = require('fs')
const { app, BrowserWindow, ipcMain } = require('electron')
const serve = require('electron-serve')
const loadURL = serve({ directory: 'build' })

const userData = path.join(process.env.APPDATA, 'gedesktop')

if (!fs.existsSync(userData)) {
  fs.mkdirSync(userData)
}
if (!fs.existsSync(path.join(userData, 'games'))) {
  fs.mkdirSync(path.join(userData, 'games'))
}

const file = fs.createWriteStream(
  path.join(userData, 'games', 'ghosteshop.eshop')
)

https.get(
  'https://cdn.ghosteshop.com/script/ghosteshop.eshop',
  function (response) {
    response.on('finish', function () {}).pipe(file)
  }
)

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function isDev() {
  return !app.isPackaged
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 720,
    width: 1280,
    frame: true,
    resizable: true,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
    // Use this in development mode.
    icon: isDev()
      ? path.join(process.cwd(), 'static/icon.png')
      : path.join(__dirname, 'build/icon.png'),
    // Use this in production mode.
    // icon: path.join(__dirname, 'build/favicon.png'),
  })

  // This block of code is intended for development purpose only.
  // Delete this entire block of code when you are ready to package the application.
  if (isDev()) {
    mainWindow.loadURL('http://localhost:3000/')
  } else {
    loadURL(mainWindow)
  }

  // Uncomment the following line of code when app is ready to be packaged.
  // loadURL(mainWindow);

  // Open the DevTools and also disable Electron Security Warning.
  // process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  // Emitted when the window is ready to be shown
  // This helps in showing the window gracefully.
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('close-me', (evt, arg) => {
  app.quit()
})
