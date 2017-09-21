const mongoose = require('mongoose');
const { Schema } = mongoose;
const LocationSchema = require('./Location');

const movieSchema = new Schema({
  title: String,
  locations: [LocationSchema]
});

mongoose.model('movies', movieSchema);
