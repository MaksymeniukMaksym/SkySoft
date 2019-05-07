const http = require("http");
const fs = require("fs");
 
http.createServer(function(request, response){

    if(request.url === "/"){
        response.write("<h1>Hello World!</h1>");

    }else if(request.url === "/html"){
        fs.readFile("./index.html", "utf8", function(error, data){
        response.end(data);
    })
}else if(request.url === "/json"){
        fs.readFile("./index.json", "utf8", function(error, data){
        response.end(data);
    })
}else{
    response.write("<h2>Not found</h2>");
}
}).listen(8080);