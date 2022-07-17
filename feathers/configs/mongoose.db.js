const mongoose = require('mongoose')
require('dotenv').config()

// Connect to mongodb
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL, {
  keepAlive: true,
  // reconnectTries: Number.MAX_VALUE, // WARN : this is not working?
  useNewUrlParser: true,
  appname: 'Feathers',
  useUnifiedTopology: true,
});

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'default') {
  mongoose.set('debug', true);
}

module.exports = mongoose