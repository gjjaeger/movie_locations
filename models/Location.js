const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationSchema = new Schema({
  address: String,
  lat: Number,
  lng: Number,
  _movie: String
});

module.exports = locationSchema;

mongoose.model('locations', locationSchema);
