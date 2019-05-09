const http = require("http");
const fs = require("fs");
 
http.createServer(function(request, response){
     
    console.log(process.argv[2])

    console.log(`Aдрес: ${request.url}`);
   
    if(process.argv[2] !== undefined)  {
        response.writeHead(200, {"Content-Type" : "application/form-data"});
        fs.createReadStream(process.argv[2].substr(1)).pipe(response);
    }
          filePath = request.url.substr(1);
         
        fs.readFile(filePath, function(error, data){
                 
            if(error){
                     
                response.statusCode = 404;
                response.end("Not found!");
            }   
            else{
                response.writeHead(200, {"Content-Type" : "application/form-data"});
                response.end(data);
            }
        })
    
   
}).listen(3000);
