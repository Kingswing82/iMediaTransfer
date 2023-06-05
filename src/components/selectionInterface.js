const { ipcRenderer } = require('electron');
const { selectedFiles } = require('../renderer.js');

function createSelectionInterface() {
  const fileList = document.getElementById('fileList');
  const transferButton = document.getElementById('transferButton');
  const progressBar = document.getElementById('progressBar');

  fileList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
      event.target.classList.toggle('selected');
      const filePath = event.target.dataset.path;
      if (selectedFiles.includes(filePath)) {
        const index = selectedFiles.indexOf(filePath);
        selectedFiles.splice(index, 1);
      } else {
        selectedFiles.push(filePath);
      }
    }
  });

  transferButton.addEventListener('click', () => {
    if (selectedFiles.length > 0) {
      ipcRenderer.send('transferStarted', selectedFiles);
    }
  });

  ipcRenderer.on('transferProgress', (event, progress) => {
    progressBar.value = progress;
  });

  ipcRenderer.on('transferCompleted', () => {
    progressBar.value = 0;
    selectedFiles.length = 0;
    const selectedItems = fileList.querySelectorAll('.selected');
    selectedItems.forEach((item) => {
      item.classList.remove('selected');
    });
  });
}

module.exports = {
  createSelectionInterface,
};