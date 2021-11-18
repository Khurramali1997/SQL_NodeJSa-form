import faker from "faker";
import mysql from "mysql";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { count } from "console";

//import fs from "fs";

dotenv.config(); //environment variables sent to process.env
var PORT = process.env.PORT || 8080;
var connection = mysql.createConnection({
  // connectionLimit: x, x is a number
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
});

connection.connect((err) => {
  if (err) {
    console.error("error connecting " + err.stack);
    return;
  }

  console.log("The connection id:", connection.threadId);
});

// To psh multiple data at once

var data = [];
for (let i = 0; i < 500; i++) {
  data.push([
    //bulk data array
    faker.internet.email(),
    faker.name.firstName(),
    faker.name.lastName(),
    faker.lorem.paragraph(),
    faker.date.past(),
  ]);
}

//console.log(data);

var person = {
  //Testing for single data
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  message: faker.lorem.paragraph(),
  created_at: faker.date.past(),
};

var queryVar = "SELECT COUNT(*) as user_count FROM users";
var insertQuery =
  "INSERT INTO users (email,firstName,lastName,message,created_at) VALUES ?"; //test query
connection.query(queryVar, function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});
connection.end();
