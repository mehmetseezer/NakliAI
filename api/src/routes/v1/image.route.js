const express = require('express');
const router = express.Router();
const { uploadMiddleware } = require('../../middlewares/multer');
const imageController = require('../../controllers/image.controller');

// Resim Yükleme
router.post('/upload', uploadMiddleware, imageController.uploadImage);

// Resim İşleme
router.post('/process', imageController.processAndResizeImage);

// Resim Silme
router.delete('/delete', imageController.deleteImageHandler);

// Resim Görüntüleme
router.get('/get', imageController.getImageHandler);

// Resim Güncelleme
router.put('/update', imageController.updateImageHandler);

module.exports = router;