const fs = require('fs')

let currentUser = null

function loadUsers()
{
    return JSON.parse(fs.readFileSync('./data/users.json'))
}

function saveUsers(users)
{
    fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2))
}

function register(username, password)
{
    let users = loadUsers()

    for(let i = 0; i < users.length; i++)
    {
        if(users[i].username === username)
        {
            return false
        }
    }

    users.push({ username: username, password: password })
    saveUsers(users)
    return true
}

function login(username, password)
{
    let users = loadUsers()

    for(let i = 0; i < users.length; i++)
    {
        if(users[i].username === username && users[i].password === password)
        {
            currentUser = username
            return true
        }
    }

    return false
}

function logout(username)
{
    if(currentUser === username)
    {
        currentUser = null
        return true
    }
    return false
}

function getUser()
{
    return currentUser
}

module.exports = { register, login, logout, getUser }