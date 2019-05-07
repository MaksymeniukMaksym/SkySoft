const http = require("http");
const fs = require("fs");
 
http.createServer(function(request, response){
     
    console.log(`Aдрес: ${request.url}`);
    if(request.url.startsWith("/root/")){
         
       
        const filePath = request.url.substr(1);
        fs.readFile(filePath, function(error, data){
                 
            if(error){
                     
                response.statusCode = 404;
                response.end("Not found!");
            }   
            else{
                response.setHeader("Content-Type", "script/javascript");
                response.end(data);
            }
        })
    }
    else{
        response.end("Hello World!");
    }
}).listen(3000);