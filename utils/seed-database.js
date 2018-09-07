'use strict';

const mongoose = require('mongoose');

const { MONGODB_URI } = require('../config');

const Cat = require('../models/cat');
const Dog = require('../models/dog');

const seedCats = require('../db/seed/cats');
const seedDogs = require('../db/seed/dogs');

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.info('Dropping Database');
    return mongoose.connection.db.dropDatabase();
  })
  .then(() => {
    console.info('Seeding Database');
    return Promise.all([
      Cat.insertMany(seedCats),
      Dog.insertMany(seedDogs)
    ]);
  })
  .then(() => {
    console.info('Disconnecting');
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
    db.disconnect();
  });