const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const libiMobile = require('libimobiledevice-node');

const readdirAsync = promisify(fs.readdir);
const statAsync = promisify(fs.stat);

const supportedFormats = require('./fileFormats');

async function browseFiles(device, directory) {
  const afcClient = await libiMobile.createAfcClient(device);
  const files = await readdirAsync(directory);
  const fileDataList = [];

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stats = await statAsync(filePath);
    const fileExtension = path.extname(file).toLowerCase();

    if (stats.isDirectory() || supportedFormats.includes(fileExtension)) {
      const fileData = {
        name: file,
        path: filePath,
        size: stats.size,
        type: stats.isDirectory() ? 'directory' : 'file',
      };
      fileDataList.push(fileData);
    }
  }

  await afcClient.close();
  return fileDataList;
}

module.exports = {
  browseFiles,
};