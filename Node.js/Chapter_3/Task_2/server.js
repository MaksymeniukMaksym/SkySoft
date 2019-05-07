const http = require("http");

http.createServer(function(request, response){
    response.write("<h1>Hello World!</h1>");
    
   
}).listen( (process.argv[2] === undefined)? 8080 : process.argv[2] );