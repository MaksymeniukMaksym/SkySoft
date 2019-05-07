const fs = require("fs");
const Transform = require('stream').Transform;

const readableStream = fs.createReadStream("input.txt", "utf-8");
const writableStream = fs.createWriteStream("output.txt", "utf-8");
const writableStreamResult = fs.createWriteStream("result.txt", "utf-8");
readableStream.pipe(writableStream);

var modify = new Transform({
    decodeStrings: false
  });

  modify._transform = function(chunk, encoding, done) {
    done(null, chunk.replace(/[A-Z]/g, "█").replace(/[0-9]/g,"░").replace(/[a-z]/g,"▒").replace(/\./g,"▄").replace(/\,/g,"▀"));
  };

  readableStream
  .pipe(modify)
  .pipe(writableStreamResult);