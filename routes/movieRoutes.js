const _ = require('lodash');
// var async = require('asyncawait/async');
// var async2 = require('async');
// const awaite = require('asyncawait/await');

const mongoose = require('mongoose');
var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'openstreetmap',

  // // Optional depending on the providers
  httpAdapter: 'https' // Default
  // apiKey: 'AIzaSyB25ipgxhrhq5nNwOR-quo-4OmonrF_ODs', // for Mapquest, OpenCage, Google Premier
  // formatter: null // 'gpx', 'string', ...
};
var geocoder = NodeGeocoder(options);

const Movie = mongoose.model('movies');

const Location = mongoose.model('locations');

module.exports = app => {
  app.post('/api/movies', async (req, res) => {
    _.map(req.body, async entry => {
      const { locations } = entry;
      const title = entry.title.trim();
      if (locations != null) {
        try {
          await geocoder
            .geocode(locations + ', San Francisco, CA, USA')
            .then((res, err) => {
              // console.log('new run');
              if (res[0] == null) {
                return;
              }
              if (res[0].state != 'California') {
                console.log(res[0].state);
                return;
              }

              const geoAddress = {
                address: locations,
                lat: res[0].latitude,
                lng: res[0].longitude
              };
              const movieTitle = entry.title.trim();
              const findMovie = async existingMovie => {
                if (existingMovie == null) {
                  const movie = await new Movie({
                    title: movieTitle
                  });
                  const newMovie = await movie.save();
                  // console.log('new', newMovie.title);
                  return newMovie;
                } else {
                  // console.log('existing', existingMovie.title);
                  return existingMovie;
                }
              };

              Movie.findOne(
                { title: entry.title.trim() },
                async (err, existingMovie) => {
                  findMovie(existingMovie).then((res, err) => {
                    const movieObj = res;
                    geoAddress._movie = movieObj.id;
                    movieObj.locations.push(geoAddress);
                    return movieObj.save();
                  });
                }
              );
            })
            .catch(function(err) {
              // console.log('ERRROR', err);
              return;
            });
        } catch (err) {
          console.log(err);
        }
      }
    });
    res.send('done');
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
