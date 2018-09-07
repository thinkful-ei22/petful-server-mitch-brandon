'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');


let cats = [
  {
    imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg', 
    imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Fluffy',
    sex: 'Female',
    age: 2,
    breed: 'Bengal',
    story: 'Thrown on the street'
  },

  {
    imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg', 
    imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Whiskers',
    sex: 'Male',
    age: 3,
    breed: 'Bengal',
    story: 'Thrown on the street'
  },

  {
    imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg', 
    imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Queenie',
    sex: 'Female',
    age: 1,
    breed: 'Bengal',
    story: 'Thrown on the street'
  }
];

let dogs = [
  {
    imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
    imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
    name: 'Zeus',
    sex: 'Male',
    age: 3,
    breed: 'Golden Retriever',
    story: 'Owner Passed away'
  },
  {
    imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
    imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
    name: 'Athena',
    sex: 'Female',
    age: 2,
    breed: 'Golden Retriever',
    story: 'Owner Passed away'
  },
  {
    imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
    imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
    name: 'Dutchie',
    sex: 'Male',
    age: 1,
    breed: 'Golden Retriever',
    story: 'Owner Passed away'
  }

];


const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.get('/api/cats', (req, res, next) => {
  return res.status(200).json(cats);
});

app.get('/api/dogs', (req,res,next) => {
  return res.status(200).json(dogs);
});

app.get('/api/cats/:index', (req, res, next) => {
  const {index} = req.params;
  return res.status(200).json(cats[index]);
});

app.get('/api/dogs/:index', (req,res,next) => {
  const {index} = req.params;

  return res.status(200).json(dogs[index]);
});

app.delete('/api/cats', (req, res, next) => {

  let remainingCats = [];
  for (let i = 1; i < cats.length; i++){
    remainingCats.push (cats[i]);
  }

  console.log(remainingCats);
  cats = remainingCats;
  return res.status(204).json(cats);

});

app.delete('/api/dogs', (req, res, next) => {

  let remainingDogs = [];
  for (let i = 1; i < dogs.length; i++){
    remainingDogs.push (dogs[i]);
  }

  console.log(remainingDogs);
  dogs = remainingDogs;
  return res.status(204).json(dogs);

});





function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
