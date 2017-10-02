const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
//order important here. otherwise userSchema is not loaded
require('./services/passport');

const app = express();

mongoose.connect(keys.mongoURI);

require('./models/Movie');

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:movie-locations/movies');

app.use(morgan('combined')); //logging framework used for debugging
app.use(cors());

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/movieRoutes')(app);
require('./routes/authRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  //epxress will serve up production assets
  // like our main.js file or main.css file
  app.use(express.static('client/build'));
  //express will serve up the index.html file
  //if it doesnt recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
