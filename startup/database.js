const postgres = require('postgres');
require('dotenv').config()

const sql = postgres({
    host: process.env.HOST,
    port: process.env.DB_PORT,
    database: process.env.DATABASE,
    username: process.env.USERNAME,
    password: process.env.PASSWORD
});

module.exports = sql;