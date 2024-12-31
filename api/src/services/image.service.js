const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
const ApiError = require('../utils/ApiError');
const { StatusCodes } = require('http-status-codes');

// Resim yükleme ayarları
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);  // Eğer uploads klasörü yoksa oluştur
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname);
        const fileName = `${Date.now()}${fileExtension}`;
        cb(null, fileName);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new ApiError(StatusCodes.BAD_REQUEST, 'Invalid file type'), false);
        }
        cb(null, true);
    }
});

// Resmi işleme (boyutlandırma vb.) işlemleri
const processImage = async (filePath, width, height) => {
    try {
        const outputPath = path.join(__dirname, '../uploads', `processed_${Date.now()}.jpg`);
        await sharp(filePath)
            .resize(width, height)
            .toFile(outputPath);
        fs.unlinkSync(filePath); // Yüklenen geçici resmi sil
        return outputPath;  // İşlenmiş resmin yolu
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error processing image');
    }
};

module.exports = {
    upload,          // Multer middleware'ini export et
    processImage     // Resim işleme işlevini export et
};
