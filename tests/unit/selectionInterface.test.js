const { selectFiles } = require('../../src/components/selectionInterface');
const { fileData } = require('../../src/utils/fileFormats');

describe('Selection Interface', () => {
  test('selectFiles should add files to selectedFiles array', () => {
    const mockFile1 = new fileData('photo1.jpg', '/path/to/photo1.jpg', 1024, 'image/jpeg');
    const mockFile2 = new fileData('video1.mp4', '/path/to/video1.mp4', 2048, 'video/mp4');

    selectFiles(mockFile1);
    expect(selectedFiles).toContain(mockFile1);

    selectFiles(mockFile2);
    expect(selectedFiles).toContain(mockFile2);
  });

  test('selectFiles should remove files from selectedFiles array if already present', () => {
    const mockFile1 = new fileData('photo1.jpg', '/path/to/photo1.jpg', 1024, 'image/jpeg');
    const mockFile2 = new fileData('video1.mp4', '/path/to/video1.mp4', 2048, 'video/mp4');

    selectFiles(mockFile1);
    selectFiles(mockFile1);
    expect(selectedFiles).not.toContain(mockFile1);

    selectFiles(mockFile2);
    selectFiles(mockFile2);
    expect(selectedFiles).not.toContain(mockFile2);
  });

  test('selectFiles should not add duplicate files to selectedFiles array', () => {
    const mockFile1 = new fileData('photo1.jpg', '/path/to/photo1.jpg', 1024, 'image/jpeg');
    const mockFile2 = new fileData('video1.mp4', '/path/to/video1.mp4', 2048, 'video/mp4');

    selectFiles(mockFile1);
    selectFiles(mockFile1);
    selectFiles(mockFile1);
    expect(selectedFiles.filter(file => file.name === mockFile1.name).length).toBe(0);

    selectFiles(mockFile2);
    selectFiles(mockFile2);
    selectFiles(mockFile2);
    expect(selectedFiles.filter(file => file.name === mockFile2.name).length).toBe(0);
  });
});