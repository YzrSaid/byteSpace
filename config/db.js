const mysql = require('mysql2');

// Database connection
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dbbytespace'
});

module.exports = db;
