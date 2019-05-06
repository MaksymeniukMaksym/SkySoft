const fs = require("fs");
const readableStream = fs.createReadStream("input.txt", "utf-8");
const writableStream = fs.createWriteStream("output.txt", "utf-8");
const writableStreamResult = fs.createWriteStream("result.txt", "utf-8");
readableStream.pipe(writableStream);

readableStream.on("data", (data) => {
    writableStreamResult.write(data.replace(/[A-Z]/g, "█").replace(/[0-9]/g,"░").replace(/[a-z]/g,"▒").replace(/\./g,"▄").replace(/\,/g,"▀"));
});