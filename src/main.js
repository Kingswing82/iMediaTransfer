const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const { connectDevice, disconnectDevice } = require('./utils/iphoneConnection');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  connectDevice(mainWindow);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  disconnectDevice();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});