const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    city: {
      type: String,
      required: true,
      trim: true,
    },
    district: {
      type: String,
      required: true,
      trim: true,
    },
    street: {
      type: String,
      required: true,
      trim: true,
    },
    postalCode: {
      type: String,
      trim: true,
    },
    coordinates: {
      type: {
        lat: Number,
        lng: Number,
      },
    },
  });