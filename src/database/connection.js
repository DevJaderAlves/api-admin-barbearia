

const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createPool(process.env.DATABASE_URL);

module.exports = connection;
