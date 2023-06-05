const { transferFiles } = require('../../src/utils/fileTransfer');
const { fileData } = require('../mocks/fileData');

describe('File Transfer', () => {
  test('should transfer selected files successfully', async () => {
    const transferResult = await transferFiles(fileData.selectedFiles, '/destination/path');
    expect(transferResult).toBe(true);
  });

  test('should throw an error if the destination path is invalid', async () => {
    try {
      await transferFiles(fileData.selectedFiles, '/invalid/destination/path');
    } catch (error) {
      expect(error.message).toBe('Invalid destination path');
    }
  });

  test('should throw an error if no files are selected', async () => {
    try {
      await transferFiles([], '/destination/path');
    } catch (error) {
      expect(error.message).toBe('No files selected for transfer');
    }
  });
});