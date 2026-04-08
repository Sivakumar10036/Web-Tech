const { getUsers, saveUsers } = require("../models/userModel");

function getUsersList(req, res)
{
    res.json(getUsers());
}

function deleteUser(req, res)
{
    const id = parseInt(req.params.id);
    let users = getUsers();

    users = users.filter(function(u)
    {
        return u.id !== id;
    });

    saveUsers(users);

    res.send("User deleted");
}

module.exports = { getUsersList, deleteUser };