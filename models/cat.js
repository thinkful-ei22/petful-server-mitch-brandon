'use strict';

const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({

  imageURL: {type: String, required: true},
  imageDescription: String,
  name: {type: String, required: true},
  sex: {type: String, required: true},
  age: Number,
  breed: {type: String, required: true},
  story: String
});

catSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  }
});

module.exports = mongoose.model('Cat', catSchema);