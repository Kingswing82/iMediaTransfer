const { ipcRenderer } = require('electron');
const { connectDevice, disconnectDevice, browseFiles, selectFiles, transferFiles } = require('./utils/iphoneConnection');

let selectedFiles = [];

ipcRenderer.on('deviceConnected', () => {
  connectDevice();
});

ipcRenderer.on('deviceDisconnected', () => {
  disconnectDevice();
});

ipcRenderer.on('fileListUpdated', (event, fileList) => {
  displayFileList(fileList);
});

ipcRenderer.on('transferStarted', () => {
  document.getElementById('progressBar').style.display = 'block';
});

ipcRenderer.on('transferProgress', (event, progress) => {
  document.getElementById('progressBar').value = progress;
});

ipcRenderer.on('transferCompleted', () => {
  document.getElementById('progressBar').style.display = 'none';
  alert('Transfer completed!');
});

function displayFileList(fileList) {
  const fileListContainer = document.getElementById('fileList');
  fileListContainer.innerHTML = '';

  fileList.forEach(fileData => {
    const fileItem = document.createElement('div');
    fileItem.classList.add('file-item');
    fileItem.innerHTML = `<span>${fileData.name}</span>`;
    fileItem.addEventListener('click', () => {
      selectFiles(fileData);
      fileItem.classList.toggle('selected');
      if (selectedFiles.includes(fileData)) {
        selectedFiles = selectedFiles.filter(file => file !== fileData);
      } else {
        selectedFiles.push(fileData);
      }
    });

    fileListContainer.appendChild(fileItem);
  });
}

document.getElementById('transferButton').addEventListener('click', () => {
  if (selectedFiles.length > 0) {
    transferFiles(selectedFiles);
  } else {
    alert('Please select files to transfer.');
  }
});

browseFiles();