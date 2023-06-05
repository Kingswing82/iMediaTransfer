const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const libiMobile = require('libimobiledevice-node');

const writeFileAsync = promisify(fs.writeFile);

const transferFiles = async (selectedFiles, targetPath) => {
  try {
    const device = await libiMobile.idevice();
    const lockdown = await libiMobile.lockdowndClient(device);
    const afcClient = await libiMobile.afcClient(lockdown);

    for (const fileData of selectedFiles) {
      const fileBuffer = await afcClient.readFile(fileData.path);
      const targetFilePath = path.join(targetPath, fileData.name);
      await writeFileAsync(targetFilePath, fileBuffer);
    }

    await afcClient.close();
    await lockdown.close();
    await device.close();

    return true;
  } catch (error) {
    console.error('Error during file transfer:', error);
    return false;
  }
};

module.exports = {
  transferFiles,
};