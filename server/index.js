// TODO: Create an express server
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = 9000;
const app = express();
const path = require('path');

const db = require('./db/index.js');
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.get('/route/getPokemon', (req, res) => {
  var queryString = "SELECT types.type, images.img, pokemon.name FROM pokemon INNER JOIN types on types.id = pokemon.typeNum INNER JOIN images on images.id = pokemon.imageNum";
  db.query(queryString, (err, data) => {
    if (err) {
      res.status(404).send('ERROR ERROR');
    } else {
      res.status(200).send(data);
    }
  })
});

app.get('/route/getTypes', (req, res) => {
  var queryString = "SELECT types.type from types"
  db.query(queryString, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(data);
    }
  })

})

app.listen(port, () => {
  console.log(`App is listening at https://localhost:${port}`)
});



