const { browseFiles } = require('../../src/utils/fileBrowser');
const { expect } = require('chai');

describe('File Browser', () => {
  it('should return an array of fileData objects', async () => {
    const files = await browseFiles();

    expect(files).to.be.an('array');
    files.forEach(file => {
      expect(file).to.have.property('name');
      expect(file).to.have.property('path');
      expect(file).to.have.property('size');
      expect(file).to.have.property('type');
    });
  });

  it('should return only photos and videos', async () => {
    const files = await browseFiles();
    const allowedTypes = ['image', 'video'];

    files.forEach(file => {
      expect(allowedTypes).to.include(file.type);
    });
  });

  it('should return an empty array if no files are found', async () => {
    const files = await browseFiles('nonexistent_directory');

    expect(files).to.be.an('array').that.is.empty;
  });
});