const { ipcRenderer } = require('electron');
const { browseFiles } = require('../utils/fileBrowser');

let fileList = document.getElementById('fileList');

ipcRenderer.on('deviceConnected', () => {
  browseFiles().then(files => {
    updateFileList(files);
  });
});

ipcRenderer.on('deviceDisconnected', () => {
  clearFileList();
});

function updateFileList(files) {
  fileList.innerHTML = '';

  files.forEach(file => {
    let listItem = document.createElement('li');
    listItem.textContent = file.name;
    listItem.dataset.path = file.path;
    listItem.addEventListener('click', () => {
      ipcRenderer.send('fileListUpdated', file);
    });

    fileList.appendChild(listItem);
  });
}

function clearFileList() {
  fileList.innerHTML = '';
}