'use strict';

const express = require('express');

const mongoose = require('mongoose');

const router = express.Router();

const Cat = require('../models/cat');

router.get('/', (req, res, next) => {

  Cat.find()
    .then(results => {
      res.status(200).json(results);
    })
    .catch(err => next(err));

});


router.get('/:id', (req, res, next) => {
  const {id} = req.params;
  
  Cat.findById(id)
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
  const newCat = {imageURL, imageDescription, name, sex, age, breed, story};

  return Cat.create(newCat)
    .then(results => {
      res.location(`${req.originalUrl}/${results.id}`).status(201).json(results);
    })
    .catch(err => next(err));
  // return res.status(201).json(cats[cats.length-1]);
});


router.delete('/:id', (req, res, next) => {
  const {id} = req.params;


  Cat.findByIdAndRemove(id)
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


router.delete('/', (req, res, next) => {

  Cat.deleteOne({})
    .then((results)  => {
      if (results){
        res.status(204).end();
      }
    })
    .catch(err => next(err));
    
});
module.exports = router;


