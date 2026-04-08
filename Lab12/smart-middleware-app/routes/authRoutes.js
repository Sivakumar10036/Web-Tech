const express = require("express");
const router = express.Router();
const fs = require("fs");

const file = "./data/users.json";

function readUsers()
{
    try
    {
        return JSON.parse(fs.readFileSync(file, "utf-8"));
    }
    catch
    {
        return [];
    }
}

function writeUsers(users)
{
    fs.writeFileSync(file, JSON.stringify(users, null, 2));
}

router.post("/register", (req, res) =>
{
    const { username, password } = req.body;

    if (!username || !password)
        return res.status(400).json({ error: "Fill all fields" });

    let users = readUsers();

    if (users.find(u => u.username === username))
        return res.json({ error: "User exists" });

    users.push({ username, password });
    writeUsers(users);

    res.json({ message: "Registered successfully" });
});

router.post("/login", (req, res) =>
{
    const { username, password } = req.body;

    const users = readUsers();

    const user = users.find(u =>
        u.username === username && u.password === password
    );

    if (user)
    {
        res.json({ token: "loggedin" });
    }
    else
    {
        res.status(401).json({ error: "Invalid login" });
    }
});

module.exports = router;