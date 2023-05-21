const mysql = require("mysql");

const DB = {
  host: 'localhost',
  port: 3306,
  user: "root",
  password: "abc123",
  database: "student"
};

const { host, user, port, password, database } = DB;

const DBConnection = mysql.createConnection({ host, port, user, password, database, multipleStatements: true });

DBConnection.connect();

module.exports.DBConnection = DBConnection;