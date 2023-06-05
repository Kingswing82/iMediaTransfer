const { connectDevice, disconnectDevice } = require('../../src/utils/iphoneConnection');
const { expect } = require('chai');

describe('iPhone Connection', () => {
  let deviceConnected = false;

  beforeEach(() => {
    deviceConnected = false;
  });

  afterEach(() => {
    if (deviceConnected) {
      disconnectDevice();
    }
  });

  it('should connect to an iPhone when connected via USB', async () => {
    deviceConnected = await connectDevice();
    expect(deviceConnected).to.be.true;
  });

  it('should disconnect from an iPhone when disconnected', async () => {
    deviceConnected = await connectDevice();
    const disconnected = await disconnectDevice();
    expect(disconnected).to.be.true;
  });

  it('should not connect when no iPhone is connected', async () => {
    deviceConnected = await connectDevice();
    if (deviceConnected) {
      await disconnectDevice();
    }
    deviceConnected = await connectDevice();
    expect(deviceConnected).to.be.false;
  });
});