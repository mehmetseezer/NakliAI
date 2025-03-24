const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { jobStatus } = require('../config/jobs'); // İş durumları için bir enum tanımlayın
const { vehicleTypes, caseTypes } = require('../config/vehicles');
const Address = require('./address.model')

const jobSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: jobStatus, // Örneğin: ['pending', 'in_progress', 'completed', 'cancelled']
      default: 'pending',
    },
    assignedTo: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    vehicles: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Vehicle',
      },
    ],
    requiredVehicleTypes: [
      {
        type: String,
        enum: Object.values(vehicleTypes),
      },
    ],
    requiredCaseTypes: [
      {
        type: String,
        enum: Object.values(caseTypes),
      },
    ],
    loadingAddress: Address,
    unloadingAddress: Address,
    images: [
      {
        type: String,
      },
    ],
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    updatedBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Plugins
jobSchema.plugin(toJSON);
jobSchema.plugin(paginate);

/**
 * @typedef Job
 */
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;