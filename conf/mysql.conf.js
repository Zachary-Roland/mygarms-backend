const mysql = require("mysql");
const util = require("util");
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  database: process.env.DB_DATABSE,
  port: process.env.DB_PORT,
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.log(err);
      console.error("Databse connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.log(err);
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.log(err);
      console.error("Database connection was refused.");
    }
  }
  if (connection) connection.release();
  return;
});

const query = util.promisify(pool.query).bind(pool);
module.exports = query;
