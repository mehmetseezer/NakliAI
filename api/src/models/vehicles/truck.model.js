const mongoose = require('mongoose');
const Vehicle = require('./vehicle.model');
const { caseTypes, vehicleTypes } = require('../../config/vehicles');

var truckSchema = new mongoose.Schema({
    caseType: {
        type: String,
        enum: caseTypes,
        required: true,
    }
});

const Truck = Vehicle.discriminator(vehicleTypes.TRUCK, truckSchema);

module.exports = Truck;