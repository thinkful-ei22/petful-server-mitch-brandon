'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const catsRouter = require('./routes/cats');
const dogRouter = require('./routes/dogs');

const Queue = require('./queueClass');

const app = express();


//Queue instance of DOGS
const dogsQ = new Queue();
dogsQ.enqueue({
  'imageURL': 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
  'imageDescription': 'A smiling golden-brown golden retreiver listening to music.',
  'name': 'Zeus',
  'sex': 'Male',
  'age': 3,
  'breed': 'Golden Retriever',
  'story': 'Owner Passed away'
});
dogsQ.enqueue({
  'imageURL': 'https://cdn3-www.dogtime.com/assets/uploads/gallery/beagle-dog-breed-pictures/6-fullbod3q.jpg',
  'imageDescription': 'A happy beagle standing on the beach.',
  'name': 'Marcy',
  'sex': 'Female',
  'age': 5,
  'breed': 'Beagle',
  'story': 'Ran away'
});
dogsQ.enqueue( {
  'imageURL': 'https://cdn0.wideopenpets.com/wp-content/uploads/2017/03/AdobeStock_104376070.jpg',
  'imageDescription': 'A young border collie holding a rubber ball.',
  'name': 'Dutch',
  'sex': 'Male',
  'age': 1,
  'breed': 'Border Collie',
  'story': 'Donated by owner'
});


//Queue instance of CATS
const catsQ = new Queue();
catsQ.enqueue({
  imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg', 
  imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
  name: 'Fluffy',
  sex: 'Female',
  age: 2,
  breed: 'Bengal',
  story: 'Thrown on the street'
});
catsQ.enqueue({
  'imageURL':'https://cdn2-www.cattime.com/assets/uploads/gallery/chartreux-cats-and-kittens/chartreux-cats-and-kittens-pictures-4.jpg', 
  'imageDescription': 'Ash-colored chartreux cat laying on a rug',
  'name': 'Whiskers',
  'sex': 'Male',
  'age': 3,
  'breed': 'Chartreux',
  'story': 'Owner has allergies'
});
catsQ.enqueue( {
  'imageURL':'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg', 
  'imageDescription': 'Orange bengal cat with black stripes lounging on concrete.',
  'name': 'Queenie',
  'sex': 'Female',
  'age': 1,
  'breed': 'American Wirehair',
  'story': 'Thrown on the street'
});


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

app.use(express.static('public'));

app.use(express.json());

// app.use('/api/cats', catsRouter);
// app.use('/api/dogs', dogRouter);


//---- GET and DELETE first cat ----// 
app.get('/api/cat', (req, res, next) => {
  return res.json(catsQ.peek());

});


app.delete('/api/cat', (req, res, next) => {
  catsQ.dequeue();
  return res.json();
});


//---- GET and DELETE first dog ----//
app.get('/api/dog', (req, res, next) => {
  return res.json(dogsQ.peek());

});

app.delete('/api/dog', (req, res, next) => {
  dogsQ.dequeue();
  return res.json();
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
