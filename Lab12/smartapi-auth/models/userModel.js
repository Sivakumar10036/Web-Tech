const fs = require("fs");
const path = "./data/users.json";

function getUsers()
{
    return JSON.parse(fs.readFileSync(path));
}

function saveUsers(users)
{
    fs.writeFileSync(path, JSON.stringify(users, null, 2));
}

module.exports = { getUsers, saveUsers };