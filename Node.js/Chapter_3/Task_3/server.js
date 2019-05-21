const http = require("http");
const fs = require("fs");
const path = require('path');

let relativePath;

if (process.argv[2]) {

  relativePath = process.argv[2].split(path.sep);
  relativePath = relativePath.filter(x => !!x);

} else relativePath = '';

console.log('relativePath:' + relativePath);
let RootFolder = '';

function find(array, value) {

  for (var i = 0; i < array.length; i++) {
    if (array[i] == value) return i;
  }

  return -1;
};

const type = ['css', 'js', 'html', 'txt', 'png', 'jpg'];

const mimeTypes = {
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.html': 'text/html',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
}

http.createServer(function (request, response) {

  let serverPath = ('/' + request.url).split(path.sep);
  console.log('request.url:' + request.url);

  serverPath = serverPath.filter(x => !!x);
  console.log('serverPath:' + serverPath);
  console.log('relativePath:' + relativePath);

  if (find(relativePath, serverPath[0]) != -1) {

    relativePath = relativePath.slice(0, find(relativePath, serverPath[0]))
  }
  RootFolder = (path.join(...relativePath, ...serverPath) == ('.'||'') ) ? "index.html" : path.join(...relativePath, ...serverPath);



  fs.readFile(RootFolder, function (error, data) {

    if (error) {
      if ((path.basename(RootFolder) === "favicon.ico") || (path.extname(path.basename(RootFolder)).slice(1) === '')) {
        response.statusCode = 403;
        response.end("Forbiden 403");
      } else

        response.statusCode = 404;
      response.end("404 Not found!");

    } else if (type.indexOf(path.extname(path.basename(RootFolder)).slice(1)) == -1) {

      response.statusCode = 403;
      response.end("Forbiden 403");

    } else {
      console.log('RootFolder:' + RootFolder);
      response.writeHead(200, { "Content-Type": (mimeTypes[path.extname(path.basename(RootFolder))] || "application/form-data") });
      response.end(data);
      console.log('Complete')
    }
  });
  console.log('-------')
}).listen(3000);
