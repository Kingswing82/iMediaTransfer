const { browseFiles } = require('../../src/utils/fileBrowser');
const { fileData } = require('../../src/utils/fileFormats');

describe('Directory Browser', () => {
  test('should return an array of fileData objects', async () => {
    const files = await browseFiles();

    expect(Array.isArray(files)).toBe(true);
    files.forEach(file => {
      expect(file).toMatchObject(fileData);
    });
  });

  test('should return only image and video files', async () => {
    const files = await browseFiles();
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'mp4', 'mov', 'avi', 'mkv', 'wmv'];

    files.forEach(file => {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      expect(allowedExtensions.includes(fileExtension)).toBe(true);
    });
  });
});