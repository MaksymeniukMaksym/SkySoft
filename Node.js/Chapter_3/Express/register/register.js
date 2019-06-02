const express = require("express");
const bodyParser = require("body-parser");
const Joi = require('@hapi/joi');

const app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/register", urlencodedParser, function (request, response) {
    response.sendFile(__dirname + "/register.html");

});

const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    birthyear: Joi.number().integer().min(1900).max(2019),
    
}).with('username', 'birthyear').without('password', 'access_token');

app.post("/register", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    console.log(request.body);
    const result = Joi.validate({ username: request.body.userName, birthyear: request.body.userbirsday}, schema,function (err, value) {
        if(err){
            response.send("Invalid")
        }

     });
    response.send(`Name: ${request.body.userName} <br> Birthyear: ${request.body.userbirsday}`);
    response.send();
});

app.get("/", function (request, response) {
    response.send("Главная страница");
});
app.listen(3000);