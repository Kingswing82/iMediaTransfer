const { createMainWindow } = require('../../src/components/mainWindow');
const { app, BrowserWindow } = require('electron');

describe('Main Window', () => {
  let mainWindow;

  beforeEach(() => {
    mainWindow = createMainWindow();
  });

  afterEach(() => {
    mainWindow.close();
  });

  test('should create a new BrowserWindow instance', () => {
    expect(mainWindow).toBeInstanceOf(BrowserWindow);
  });

  test('should load index.html', () => {
    const expectedUrl = `file://${__dirname}/../../src/index.html`;
    expect(mainWindow.loadURL).toHaveBeenCalledWith(expectedUrl);
  });

  test('should have correct window properties', () => {
    const expectedProperties = {
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
      },
    };
    expect(mainWindow.webContents.openDevTools).toHaveBeenCalled();
    expect(mainWindow.setMenu).toHaveBeenCalledWith(null);
    expect(mainWindow).toMatchObject(expectedProperties);
  });

  test('should close the window when app is ready', () => {
    app.emit('ready');
    expect(mainWindow.isDestroyed()).toBe(false);
    mainWindow.emit('closed');
    expect(mainWindow.isDestroyed()).toBe(true);
  });
});