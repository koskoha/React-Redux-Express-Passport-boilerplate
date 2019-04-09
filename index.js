/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('errorhandler');
const flash = require('connect-flash');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
mongoose.connection.on('error', error => console.log(error));
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

const corsOptions = {
  origin: keys.frontendHost,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));
app.use(cors(corsOptions));

if (!isProduction) {
  app.use(errorHandler());
}

require('./models/user');
// require('./services/passport');
// Passport Config
require('./auth/passport')(passport);

const secureRoute = require('./routes/secure-routes');
const auth = require('./routes/authRoutes');

if (isProduction) {
  // eslint-disable-next-line global-require
  const path = require('path');
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// app.use('/', authRoutes);
app.use('/api', auth);
// We plugin our jwt strategy as a middleware so only verified users can access this route
app.use('/', passport.authenticate('jwt', { session: false }), secureRoute);

if (!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('hr-notify server listening at port: ', PORT);
});
