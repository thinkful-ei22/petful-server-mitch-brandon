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
    imageURL:'https://cdn2-www.cattime.com/assets/uploads/gallery/chartreux-cats-and-kittens/chartreux-cats-and-kittens-pictures-4.jpg', 
    imageDescription: 'Ash-colored chartreux cat laying on a rug',
    name: 'Whiskers',
    sex: 'Male',
    age: 3,
    breed: 'Chartreux',
    story: 'Owner has allergies'
  },

  {
    imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg', 
    imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Queenie',
    sex: 'Female',
    age: 1,
    breed: 'American Wirehair',
    story: 'Thrown on the street'
  },
  {
    imageURL:'https://catsphd.com/wp-content/uploads/2017/08/Birman-Cat-Breed-Information.jpg', 
    imageDescription: 'A Chocolate Point birman cat',
    name: 'Bruce',
    sex: 'Male',
    age: 5,
    breed: 'Birman',
    story: 'Thrown on the street'
  },

  {
    imageURL:'https://d2pu2bk1b66iw6.cloudfront.net/photos/2015/05/14/6-102970-egyptian-mau-cat-1431627195.jpg', 
    imageDescription: 'A silver spotted Egyptian Mau cat.',
    name: 'Isis',
    sex: 'Female',
    age: 6,
    breed: 'Egyptian Mau',
    story: 'Owner has passed'
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
    imageURL: 'https://cdn3-www.dogtime.com/assets/uploads/gallery/beagle-dog-breed-pictures/6-fullbod3q.jpg',
    imageDescription: 'A happy beagle standing on the beach.',
    name: 'Marcy',
    sex: 'Female',
    age: 5,
    breed: 'Beagle',
    story: 'Ran away'
  },
  {
    imageURL: 'https://cdn0.wideopenpets.com/wp-content/uploads/2017/03/AdobeStock_104376070.jpg',
    imageDescription: 'A young border collie holding a rubber ball.',
    name: 'Dutch',
    sex: 'Male',
    age: 1,
    breed: 'Border Collie',
    story: 'Donated by owner'
  },
  {
    imageURL: 'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/06014400/bulldog-on-skateboard-grinning.jpg',
    imageDescription: 'A bulldog on a skateboard.',
    name: 'Hulk',
    sex: 'Male',
    age: 7,
    breed: 'Bulldog',
    story: 'Owner passed away'
  },
  {
    imageURL: 'https://www.petguide.com/wp-content/uploads/2013/02/parson-russell-terrier1.jpg',
    imageDescription: 'A russell terrier in the grass',
    name: 'Bella',
    sex: 'Female',
    age: 2,
    breed: 'Russell Terrier',
    story: 'Ran away'
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
