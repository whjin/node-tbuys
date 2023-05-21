const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "database"
});

connection.connect(function (err) {
  if (err) {
    return new Error(err);
  }
  console.log("mysql is connected", connection);
});

const userid = "123456";

const sql = `select * from users where userid=${connection.escape(userid)}`;

connection.query(sql, function (err, rows) {
  if (err) {
    return new Error(err);
  }
  console.log(rows);
});