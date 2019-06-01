const express = require("express");
const fs = require("fs");

const app = express();




 
app.use("/about", function(request, response){
      
    console.log(request.query);
    let id = request.query.user.id;
    let name = request.query.user.name;
     
    response.send("<h3>id:" + id + "<br>name: " + name +"</h3>");
});
 


//================================//

// app.get("/", function(request, response){
      
//     response.send("<h1>Главная страница</h1>");
// });
// app.use("/about", function(request, response){
      
//     console.log(request.query);
//     let names = request.query.name;
//     let responseText = "<ul>";
//     for(let i=0; i < names.length; i++){
//         responseText += "<li>" + names[i] + "</li>";
//     }
//     responseText += "</ul>";
//     response.send(responseText);
// });

//=============================//

// app.get("/", function(request, response){
      
//     response.send("<h1>Главная страница</h1>");
// });
// app.use("/about", function(request, response){
      
//     let id = request.query.id;
//     let userName = request.query.name;
//     let status = request.query.status;
//         response.send("<h1>Информация</h1><p>id=" + id +"</p><p>name=" + userName + "</p>"+ "<p>status=" + status + "</p>");
// });

//==================================//

// app.use("/static",express.static(__dirname + "/public"));


// app.use("/", function (request, response) {

//     response.send("<h1>Главная страница</h1>");
// });

//==========================//

//app.use(function(request, response, next){

//     let now = new Date();
//     let hour = now.getHours();
//     let minutes = now.getMinutes();
//     let seconds = now.getSeconds();
//     let data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")}`;
//     console.log(data);
//     fs.appendFile("server.log", data + "\n", function(){});
//     response.send(Buffer.from("Hello Express"));
//     next();
// });

// app.get("/", function(request, response){
//     response.send("Hello");
// });

//===================================//
app.listen(3000);