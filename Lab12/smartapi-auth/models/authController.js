const { getUsers, saveUsers } = require("../models/userModel");
const { addLog } = require("../models/logModel");

function register(req, res)
{
    const { name, email, password } = req.body;

    if(!name || !email || !password)
    {
        return res.send("All fields required");
    }

    const users = getUsers();

    const exists = users.find(function(u)
    {
        return u.email === email;
    });

    if(exists)
    {
        return res.send("User already exists");
    }

    const newUser =
    {
        id: Date.now(),
        name,
        email,
        password
    };

    users.push(newUser);
    saveUsers(users);

    res.send("Registered successfully");
}

function login(req, res)
{
    const { email, password } = req.body;
    const users = getUsers();

    const user = users.find(function(u)
    {
        return u.email === email && u.password === password;
    });

    const log =
    {
        email: email,
        time: new Date().toLocaleString(),
        ip: req.ip,
        status: user ? "SUCCESS" : "FAILED"
    };

    addLog(log);

    if(!user)
    {
        return res.send("Invalid credentials");
    }

    res.json({ message: "Login successful", user });
}

module.exports = { register, login };