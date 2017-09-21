const _ = require('lodash');

const mongoose = require('mongoose');

const Movie = mongoose.model('movies');

module.exports = app => {
  app.post('/api/movies', (req, res) => {
    const { title, locations } = req.body;
    const movie = new Movie({
      title,
      locations: locations
        .split(',')
        .map(address => ({ address: address.trim() }))
    }).save();

    res.send(movie);
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
