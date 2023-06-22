const mysql = require("mysql2");

// /data base configuration local
const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "t",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();

// /data base configuration
// var mysql = require('mysql');

// var connection = mysql.createConnection({
//   host: "fastmove.cyltlmrg7fka.ap-southeast-2.rds.amazonaws.com",
//   user: "admin",
//   password: "Fastmove1234",
//   database: "fastmove",
// });
// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("connected to database")
//   });

// module.exports = connectio
