const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { StatusCodes } = require('http-status-codes');
const imageService = require('../services/image.service');

/**
 * Resim Yükleme
 */
const uploadImage = catchAsync(async (req, res) => {
  if (!req.file) throw new ApiError(StatusCodes.BAD_REQUEST, 'Resim dosyası yüklenmedi!');
  res.status(StatusCodes.CREATED).send({ path: req.file.path });
});

/**
 * Resim İşleme ve Boyutlandırma
 */
const processAndResizeImage = catchAsync(async (req, res) => {
  const { filePath } = req.body;
  const { width, height } = req.query;

  if (!filePath || !width || !height) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Dosya yolu, genişlik ve yükseklik zorunludur!');
  }

  try {
    const processedPath = await imageService.processImage(filePath, parseInt(width), parseInt(height));
    res.status(StatusCodes.OK).send({ path: processedPath });
  } catch (error) {
    const status = error.message === imageService.ERROR_MESSAGES.IMAGE_NOT_FOUND 
      ? StatusCodes.NOT_FOUND 
      : StatusCodes.INTERNAL_SERVER_ERROR;
    throw new ApiError(status, error.message);
  }
});

/**
 * Resim Silme
 */
const deleteImageHandler = catchAsync(async (req, res) => {
  const { filePath } = req.body;
  if (!filePath) throw new ApiError(StatusCodes.BAD_REQUEST, 'Dosya yolu zorunludur!');

  try {
    await imageService.deleteImage(filePath);
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    const status = error.message === imageService.ERROR_MESSAGES.IMAGE_NOT_FOUND 
      ? StatusCodes.NOT_FOUND 
      : StatusCodes.INTERNAL_SERVER_ERROR;
    throw new ApiError(status, error.message);
  }
});

/**
 * Resmi Görüntüleme
 */
const getImageHandler = catchAsync(async (req, res) => {
  const { filePath } = req.query;
  if (!filePath) throw new ApiError(StatusCodes.BAD_REQUEST, 'Dosya yolu zorunludur!');

  try {
    const imageBuffer = imageService.getImage(filePath);
    res.set('Content-Type', 'image/jpeg');
    res.send(imageBuffer);
  } catch (error) {
    const status = error.message === imageService.ERROR_MESSAGES.IMAGE_NOT_FOUND 
      ? StatusCodes.NOT_FOUND 
      : StatusCodes.INTERNAL_SERVER_ERROR;
    throw new ApiError(status, error.message);
  }
});

/**
 * Resmi Güncelleme
 */
const updateImageHandler = catchAsync(async (req, res) => {
  const { oldPath, newPath } = req.body;
  if (!oldPath || !newPath) throw new ApiError(StatusCodes.BAD_REQUEST, 'Eski ve yeni dosya yolu zorunludur!');

  try {
    await imageService.updateImage(oldPath, newPath);
    res.status(StatusCodes.OK).send({ message: 'Resim başarıyla güncellendi!' });
  } catch (error) {
    const status = error.message === imageService.ERROR_MESSAGES.IMAGE_NOT_FOUND 
      ? StatusCodes.NOT_FOUND 
      : StatusCodes.INTERNAL_SERVER_ERROR;
    throw new ApiError(status, error.message);
  }
});

module.exports = {
  uploadImage,
  processAndResizeImage,
  deleteImageHandler,
  getImageHandler,
  updateImageHandler,
};