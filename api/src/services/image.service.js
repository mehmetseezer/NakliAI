const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

/**
 * Resim işlemleri için hata mesajları
 * @constant {Object} ERROR_MESSAGES
 * @property {string} IMAGE_NOT_FOUND - Resim bulunamadı hatası
 * @property {string} PROCESSING_ERROR - Resim işleme hatası
 * @property {string} DELETION_ERROR - Resim silme hatası
 * @property {string} READ_ERROR - Resim okuma hatası
 * @property {string} UPDATE_ERROR - Resim güncelleme hatası
 */
const ERROR_MESSAGES = {
  IMAGE_NOT_FOUND: 'Resim bulunamadı',
  PROCESSING_ERROR: 'Resim işlenirken hata oluştu',
  DELETION_ERROR: 'Resim silinirken hata oluştu',
  READ_ERROR: 'Resim okunurken hata oluştu',
  UPDATE_ERROR: 'Resim güncellenirken hata oluştu',
};

/**
 * Resmi boyutlandırır ve işler
 * @async
 * @function processImage
 * @param {string} filePath - İşlenecek resmin dosya yolu
 * @param {number} width - Hedef genişlik (piksel cinsinden)
 * @param {number} height - Hedef yükseklik (piksel cinsinden)
 * @returns {Promise<string>} İşlenmiş resmin yeni dosya yolu
 * @throws {Error} IMAGE_NOT_FOUND - Dosya bulunamazsa
 * @throws {Error} PROCESSING_ERROR - İşlem sırasında hata oluşursa
 * @example
 * await processImage('/uploads/image.jpg', 800, 600);
 */
const processImage = async (filePath, width, height) => {
  if (!fs.existsSync(filePath)) throw new Error(ERROR_MESSAGES.IMAGE_NOT_FOUND);
  
  try {
    const outputPath = path.join(__dirname, '../uploads', `processed_${Date.now()}.jpg`);
    await sharp(filePath).resize(width, height).toFile(outputPath);
    fs.unlinkSync(filePath); // Orjinal dosyayı sil
    return outputPath;
  } catch (error) {
    throw new Error(ERROR_MESSAGES.PROCESSING_ERROR);
  }
};

/**
 * Resmi kalıcı olarak siler
 * @async
 * @function deleteImage
 * @param {string} filePath - Silinecek resmin dosya yolu
 * @throws {Error} IMAGE_NOT_FOUND - Dosya bulunamazsa
 * @throws {Error} DELETION_ERROR - Silme işlemi başarısız olursa
 * @example
 * await deleteImage('/uploads/image.jpg');
 */
const deleteImage = async (filePath) => {
  if (!fs.existsSync(filePath)) throw new Error(ERROR_MESSAGES.IMAGE_NOT_FOUND);
  
  try {
    fs.unlinkSync(filePath);
  } catch (error) {
    throw new Error(ERROR_MESSAGES.DELETION_ERROR);
  }
};

/**
 * Resmi binary veri olarak okur
 * @function getImage
 * @param {string} filePath - Okunacak resmin dosya yolu
 * @returns {Buffer} Resmin binary verisi
 * @throws {Error} IMAGE_NOT_FOUND - Dosya bulunamazsa
 * @throws {Error} READ_ERROR - Okuma işlemi başarısız olursa
 * @example
 * const imageBuffer = getImage('/uploads/image.jpg');
 */
const getImage = (filePath) => {
  if (!fs.existsSync(filePath)) throw new Error(ERROR_MESSAGES.IMAGE_NOT_FOUND);
  
  try {
    return fs.readFileSync(filePath);
  } catch (error) {
    throw new Error(ERROR_MESSAGES.READ_ERROR);
  }
};

/**
 * Resmin dosya konumunu veya adını değiştirir
 * @async
 * @function updateImage
 * @param {string} oldPath - Resmin mevcut dosya yolu
 * @param {string} newPath - Resmin yeni dosya yolu
 * @throws {Error} IMAGE_NOT_FOUND - Eski dosya bulunamazsa
 * @throws {Error} UPDATE_ERROR - Güncelleme işlemi başarısız olursa
 * @example
 * await updateImage('/uploads/old.jpg', '/uploads/new.jpg');
 */
const updateImage = async (oldPath, newPath) => {
  if (!fs.existsSync(oldPath)) throw new Error(ERROR_MESSAGES.IMAGE_NOT_FOUND);
  
  try {
    fs.renameSync(oldPath, newPath);
  } catch (error) {
    throw new Error(ERROR_MESSAGES.UPDATE_ERROR);
  }
};

module.exports = { processImage, deleteImage, getImage, updateImage };