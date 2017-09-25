const _ = require('lodash');
var async = require('asyncawait/async');
var async2 = require('async');
var await = require('asyncawait/await');

const mongoose = require('mongoose');
var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyAUCiTUszeY7oXzJ7x_RLaF69FbjNWV4Dg', // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};
var geocoder = NodeGeocoder(options);

const Movie = mongoose.model('movies');

module.exports = app => {
  app.post('/api/movies', async (req, res) => {
    const { title, locations } = req.body;
    const splitLoc = locations.split(',');
    async2.map(splitLoc, stat, function(err, results){
      const movie = new Movie({
        title,
        locations: results.map((address)=> ({
          address: address.address,
          lng: address.lng,
          lat: address.lat
        }))
      }).save();
      res.send(movie);
    });
    function stat(address, callback){
      geocoder
        .geocode(address, (req, res, err) => {
          const long = {address: address, lat : res[0].latitude, lng: res[0].longitude};
          callback(null, long);
        })
    }
    
  });
  app.get('/api/movies', async (req, res) => {
    Movie.find(
      {},
      await function(err, movies) {
        res.send(movies);
      }
    );
  });
};
