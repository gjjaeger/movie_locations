const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationSchema = new Schema({
  address: String,
  lat: String,
  lng: String
});

module.exports = locationSchema;
