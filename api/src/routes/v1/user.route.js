const express = require('express');
const router = express.Router();
const { uploadMiddleware } = require('../../middlewares/multer');
const imageController = require('../../controllers/image.controller');

// Route'lar
router.post('/upload', uploadMiddleware, imageController.uploadImage);
router.post('/process', imageController.processAndResizeImage);
router.delete('/delete', imageController.deleteImageHandler);
router.get('/get', imageController.getImageHandler);
router.put('/update', imageController.updateImageHandler);

/**
 * @swagger
 * tags:
 *   name: Images
 *   description: Resim yönetimi endpoint'leri
 */

/**
 * @swagger
 * /images/upload:
 *   post:
 *     summary: Resim yükleme
 *     tags: [Images]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         required: true
 *         description: Yüklenecek resim dosyası
 *     responses:
 *       201:
 *         description: Resim başarıyla yüklendi
 *         schema:
 *           type: object
 *           properties:
 *             path:
 *               type: string
 *               example: "/uploads/12345.jpg"
 *       400:
 *         description: Geçersiz dosya türü veya dosya yok
 */

/**
 * @swagger
 * /images/process:
 *   post:
 *     summary: Resmi işleme ve boyutlandırma
 *     tags: [Images]
 *     parameters:
 *       - in: query
 *         name: filePath
 *         required: true
 *         type: string
 *         example: "/uploads/image.jpg"
 *       - in: query
 *         name: width
 *         required: true
 *         type: integer
 *         example: 800
 *       - in: query
 *         name: height
 *         required: true
 *         type: integer
 *         example: 600
 *     responses:
 *       200:
 *         description: İşlenmiş resim yolu
 *         schema:
 *           type: object
 *           properties:
 *             path:
 *               type: string
 *               example: "/uploads/processed_12345.jpg"
 *       404:
 *         description: Resim bulunamadı
 */

/**
 * @swagger
 * /images/delete:
 *   delete:
 *     summary: Resim silme
 *     tags: [Images]
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             filePath:
 *               type: string
 *               example: "/uploads/image.jpg"
 *     responses:
 *       204:
 *         description: Resim başarıyla silindi
 *       404:
 *         description: Resim bulunamadı
 */

/**
 * @swagger
 * /images/get:
 *   get:
 *     summary: Resmi görüntüleme
 *     tags: [Images]
 *     parameters:
 *       - in: query
 *         name: filePath
 *         required: true
 *         type: string
 *         example: "/uploads/image.jpg"
 *     responses:
 *       200:
 *         description: Resim binary verisi
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Resim bulunamadı
 */

/**
 * @swagger
 * /images/update:
 *   put:
 *     summary: Resim güncelleme
 *     tags: [Images]
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             oldPath:
 *               type: string
 *               example: "/uploads/old.jpg"
 *             newPath:
 *               type: string
 *               example: "/uploads/new.jpg"
 *     responses:
 *       200:
 *         description: Resim başarıyla güncellendi
 *       404:
 *         description: Eski resim bulunamadı
 */

module.exports = router;