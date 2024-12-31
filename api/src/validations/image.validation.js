const Joi = require('joi');

const uploadImage = {
    body: Joi.object().keys({
        image: Joi.string().required().custom((value, helpers) => {
            const validImageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff']; // Geçerli resim uzantıları
            const extension = value.substring(value.lastIndexOf('.')); // Dosya uzantısını alıyoruz
            if (!validImageExtensions.includes(extension)) {
                return helpers.message('Only image files are allowed (jpg, jpeg, png, gif, bmp, tiff)');
            }
            return value;
        }),
    }),
};

const getImages = {
    query: Joi.object().keys({
        name: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer().min(1).default(10),
        page: Joi.number().integer().min(1).default(1),
    }),
};

const getImage = {
    params: Joi.object().keys({
        filename: Joi.string().required(),
    }),
};

const deleteImage = {
    params: Joi.object().keys({
        filename: Joi.string().required(),
    }),
};

module.exports = {
    uploadImage,
    getImages,
    getImage,
    deleteImage,
};
