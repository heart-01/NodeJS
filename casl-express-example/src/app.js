const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { accessibleRecordsPlugin } = require('@casl/mongoose');
const errorHandler = require('./error-handler');

const MODULES = ['auth', 'comments', 'posts', 'users'];

module.exports = function createApp() {
  const app = express();

  // Configure plugin casl รวมกับ mongoose
  mongoose.plugin(accessibleRecordsPlugin);
  app.use(bodyParser.json());

  // Import route index แล้วโยน app เข้าไปในไฟล์ function configure ของแต่ละ modules
  MODULES.forEach((moduleName) => {
    const appModule = require(`./modules/${moduleName}`); // eslint-disable-line

    if (typeof appModule.configure === 'function') {
      appModule.configure(app);
    }
  });

  // handle เมื่อมี error ของ casl หรือ http error
  app.use(errorHandler);

  // connect mongo db
  mongoose.Promise = global.Promise;
  return mongoose.connect('mongodb://localhost:27017/blog')
    .then(() => app);
};
