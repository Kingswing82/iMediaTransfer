const libiMobileDevice = require('libimobiledevice-node');

let deviceConnected = false;

function connectDevice(callback) {
  libiMobileDevice.idevice().then(device => {
    deviceConnected = true;
    callback(null, device);
  }).catch(error => {
    callback(error, null);
  });
}

function disconnectDevice() {
  deviceConnected = false;
}

function isDeviceConnected() {
  return deviceConnected;
}

module.exports = {
  connectDevice,
  disconnectDevice,
  isDeviceConnected
};