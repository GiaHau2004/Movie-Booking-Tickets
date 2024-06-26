const dbConfig = require('../configs/db.config')
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
})

connection.connect(error => {
    if (error) throw error;
    console.log(`Successfully connected to the database: ${dbConfig.DB}`);
})

module.exports = connection;