// TODO: Establish connection to mysql database
const mysql = require("mysql");

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pokedex'
})

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log('db connected')
  }
})

module.exports = connection;