const express = require("express");
const app = express();
 
// app.use(function (request, response) {
//   response.sendFile(__dirname + "/main.html");
// });
app.use("/home/foo/bar",function (request, response) {
    response.status(404).send(`Ресурс не найден`);
  });
   
 
app.listen(3000);