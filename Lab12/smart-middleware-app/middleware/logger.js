const fs = require("fs");

module.exports = (req, res, next) =>
{
    const log = `[ACCESS] ${req.method} ${req.url} ${new Date().toISOString()}\n`;

    fs.appendFile("./logs/access.log", log, () => {});

    console.log(log);

    next();
};