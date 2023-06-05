const { app, BrowserWindow } = require('electron');
const { connectDevice, disconnectDevice, browseFiles, selectFiles, transferFiles } = require('../src/utils/iphoneConnection');
const { expect } = require('chai');

let mainWindow;

beforeEach(() => {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
});

afterEach(() => {
  mainWindow.close();
});

describe('iMediaTransfer Integration Tests', () => {
  it('should connect and disconnect iPhone', async () => {
    const isConnected = await connectDevice();
    expect(isConnected).to.be.true;

    const isDisconnected = await disconnectDevice();
    expect(isDisconnected).to.be.true;
  });

  it('should browse iPhone directories and files', async () => {
    const files = await browseFiles();
    expect(files).to.be.an('array');
    expect(files.length).to.be.greaterThan(0);
  });

  it('should select and transfer files', async () => {
    const files = await browseFiles();
    const selectedFiles = selectFiles(files, 0, 2);
    expect(selectedFiles).to.be.an('array');
    expect(selectedFiles.length).to.equal(3);

    const transferResult = await transferFiles(selectedFiles);
    expect(transferResult).to.be.true;
  });
});