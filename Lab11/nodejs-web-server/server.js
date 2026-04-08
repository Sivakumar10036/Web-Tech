const http = require("http");
const fs = require("fs");
const path = require("path");
const routes = require("./routes");

const port = 3000;

const server = http.createServer(function(req, res)
{
    if(req.url === "/style.css")
    {
        const file = path.join(__dirname, "public", "style.css");
        fs.readFile(file, function(err, data)
        {
            res.setHeader("Content-Type", "text/css");
            res.end(data);
        });
    }
    else if(req.url === "/script.js")
    {
        const file = path.join(__dirname, "public", "script.js");
        fs.readFile(file, function(err, data)
        {
            res.setHeader("Content-Type", "application/javascript");
            res.end(data);
        });
    }
    else
    {
        routes(req, res);
    }
});

server.listen(port, function()
{
    console.log("🚀 Server running at http://localhost:" + port);
});