import faker from "faker";
import mysql from "mysql";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { count } from "console";

//import fs from "fs";

dotenv.config(); //environment variables sent to process.env
var PORT = process.env.PORT || 8080;
var app = express();
var connection = mysql.createConnection({
  // connectionLimit: x, x is a number
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
});

//import fs from "fs";

dotenv.config(); //environment variables sent to process.env
var PORT = process.env.PORT || 8080;
var __dirname = path.resolve();
var connection = mysql.createConnection({
  // connectionLimit: x, x is a number
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("/public"));

app.get("/count", (req, res) => {
  var queryVar = "SELECT COUNT(*) as user_count FROM users";
  connection.query(queryVar, (err, results) => {
    if (err) throw err;
    //console.log(results);
    var numbers = results[0].user_count;
    res.sendFile(__dirname + "/public/index.html");
    //res.send({ data: numbers });
  });
});

app.post("/register", (req, res) => {
  var userEmail = req.body.email;
  var userFirstName = req.body.firstName;
  var userLastName = req.body.lastName;
  var userMessage = req.body.message;
  console.log(
    `Data recieved are name ${userFirstName} ${userLastName} user email ${userEmail} message ${userMessage}`
  );
  var person = {
    email: userEmail,
    firstName: userFirstName,
    lastName: userLastName,
    message: userMessage,
  };

  connection.query("INSERT INTO users SET ?", person, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});

app.listen(PORT, () => {
  console.log(`Listning to the port : ${PORT} `);
});
