const fs = require("fs");
const path = require("path");
const url = require("url");
const utils = require("./utils");

module.exports = function(req, res)
{
    const parsedUrl = url.parse(req.url, true);

    if(parsedUrl.pathname === "/")
    {
        const file = path.join(__dirname, "views", "home.html");
        fs.readFile(file, function(err, data)
        {
            res.setHeader("Content-Type", "text/html");
            res.end(data);
        });
    }
    else if(parsedUrl.pathname === "/about")
    {
        const file = path.join(__dirname, "views", "about.html");
        fs.readFile(file, function(err, data)
        {
            res.setHeader("Content-Type", "text/html");
            res.end(data);
        });
    }
    else if(parsedUrl.pathname === "/contact")
    {
        const name = parsedUrl.query.name || "";

        const file = path.join(__dirname, "views", "contact.html");
        fs.readFile(file, "utf-8", function(err, data)
        {
            const modified = data.replace("{{name}}", name);
            res.setHeader("Content-Type", "text/html");
            res.end(modified);
        });
    }
    else if(parsedUrl.pathname === "/api/time")
    {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ time: utils.getTime() }));
    }
    else if(parsedUrl.pathname === "/api/greet")
    {
        const name = parsedUrl.query.name || "Guest";
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Hello " + name }));
    }
    else
    {
        const file = path.join(__dirname, "views", "notfound.html");
        fs.readFile(file, function(err, data)
        {
            res.setHeader("Content-Type", "text/html");
            res.end(data);
        });
    }
};