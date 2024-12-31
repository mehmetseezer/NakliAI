const mongoose = require('mongoose');
const Vehicle = require('./vehicle.model');
const { caseTypes, vehicleTypes } = require('../../config/vehicles');

const trailerSchema = mongoose.Schema({
    SemiTruck: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'semiTruck',
    },

    caseType: {
        type: String,
        enum: caseTypes,
        required: true,
    }
});

const Trailer = Vehicle.discriminator(vehicleTypes.TRAILER, trailerSchema);

module.exports = Trailer;