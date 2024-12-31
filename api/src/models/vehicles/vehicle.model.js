const mongoose = require('mongoose');
const { vehicleTypes } = require('../../config/vehicles');
const { toJSON } = require('../plugins');

const vehicleSchema = new mongoose.Schema({
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },

    plate: {
        type: String,
        required: true,
        validate(value) {
            if (!value.match(/^(0[1-9]|[1-7][0-9]|8[01])(([A-Z])(\d{4,5})|([A-Z]{2})(\d{3,4})|([A-Z]{3})(\d{2}))$/)) {
                throw new Error('Value must be a valid plate');
            }
        }
    },

    vehicleType: {
        type: String,
        enum: vehicleTypes,
        required: true,
    },
}, { discriminatorKey: 'vehicleType', collection: 'vehicles', timestamps: true });

vehicleSchema.plugin(toJSON);

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;