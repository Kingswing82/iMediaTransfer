const supportedImageFormats = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "bmp",
  "tiff",
  "webp",
  "heic",
];

const supportedVideoFormats = [
  "mp4",
  "mov",
  "m4v",
  "avi",
  "wmv",
  "flv",
  "mkv",
  "webm",
];

function isSupportedImageFormat(extension) {
  return supportedImageFormats.includes(extension.toLowerCase());
}

function isSupportedVideoFormat(extension) {
  return supportedVideoFormats.includes(extension.toLowerCase());
}

function isSupportedFileFormat(extension) {
  return (
    isSupportedImageFormat(extension) || isSupportedVideoFormat(extension)
  );
}

module.exports = {
  isSupportedImageFormat,
  isSupportedVideoFormat,
  isSupportedFileFormat,
};