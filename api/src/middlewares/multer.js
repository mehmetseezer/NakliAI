const multer = require('multer');
const path = require('path');
const ApiError = require('../utils/ApiError');
const { StatusCodes } = require('http-status-codes');

// Multer storage konfigürasyonu
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname);
        const fileName = `${Date.now()}${fileExtension}`;
        cb(null, fileName);
    }
});

// Multer config
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

// Tek dosya yüklemek için Multer middleware
const uploadMiddleware = upload.single('image');

module.exports = {
    uploadMiddleware,
};
