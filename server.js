const url = require("url");
const fs = require("fs");
const http = require("http");

http.createServer((Request, Response) => {
    let addr = Request.url;
    let q = url.parse(addr, true);
    let filepath = "";

    Response.writeHead(200, { "Content-Type": "text/plain" });
    Response.end("Hello Node!\n");

    if (q.pathname.includes("documentation")) {
        filepath = (__dirname + "/documentation.html");
    } else {
        filepath = "index.html";
    }

    fs.appendFile("log.txt", "URL: " + addr + "\nTimestamp: " + new Date() + "\n\n", function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Added to log.");
        }
    });
}).listen(8080);

console.log("My first Node test server is running on Port 8080.");