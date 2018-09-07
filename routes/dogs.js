'use strict';

const express = require('express');

const mongoose = require('mongoose');

const router = express.Router();

const Dog = require('../models/dog');

router.get('/', (req, res, next) => {

  Dog.find()
    .then(results => {
      res.status(200).json(results);
    })
    .catch(err => next(err));

});


router.get('/:id', (req, res, next) => {
  const {id} = req.params;
  
  Dog.findById(id)
    .then(results => {
      if (results){
        res.status(200).json(results);
      }
      else {
        next();
      }
    })
    .catch(err => next(err));
});


router.post('/', (req, res, next) => {
  const {imageURL, imageDescription, name, sex, age, breed, story} = req.body;
  const newDog = {imageURL, imageDescription, name, sex, age, breed, story};

  return Dog.create(newDog)
    .then(results => {
      res.location(`${req.originalUrl}/${results.id}`).status(201).json(results);
    })
    .catch(err => next(err));
});


router.delete('/:id', (req, res, next) => {
  const {id} = req.params;


  Dog.findByIdAndRemove(id)
    .then(results => {
      if(results){
        res.status(204).end();
      }
      else {
        next();
      }
    })
    .catch(err => next(err));

});

// router.delete('/', (req, res, next) => {

//   console.log(Cat[0]);

// });
module.exports = router;