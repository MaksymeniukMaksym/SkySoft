const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const passport = require('passport')
const session = require('express-session')

const app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false });
let user_data = [];
let sql = '';
const connection = mysql.createConnection({
    host: "localhost",
    user: "maks",
    database: "node_db",
    password: "Maks3226"
});

app.use(express.static(__dirname));

app.get("/", urlencodedParser, function (request, response) {
    response.sendFile(__dirname + "/index.html");
});


app.get("/register", urlencodedParser, function (request, response) {
    response.sendFile(__dirname + "/register.html");
});
app.post("/register", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    user_data = [request.body.userLogin, request.body.userPassword];

    console.log(user_data);

    sql = `INSERT INTO user (login, password) VALUES (?,?)`;

    connection.query(sql, user_data, function (err, data) {
        if (err) {
            return console.log(err);
        } else console.log("Данные добавлены");
        response.redirect("/");

    });
});


app.listen(3000);