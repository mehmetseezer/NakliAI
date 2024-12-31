const mongoose = require('mongoose');
const { vehicleTypes } = require('../../config/vehicles');
const Vehicle = require('./vehicle.model');

const semiTruckSchema = mongoose.Schema({});

const SemiTruck = Vehicle.discriminator(vehicleTypes.SEMI, semiTruckSchema);

module.exports = SemiTruck;