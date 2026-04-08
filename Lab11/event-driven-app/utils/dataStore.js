const fs = require('fs')

function loadData()
{
    return JSON.parse(fs.readFileSync('./data/data.json'))
}

function saveData(data)
{
    fs.writeFileSync('./data/data.json', JSON.stringify(data, null, 2))
}

function addData(user, message)
{
    let data = loadData()
    data.push({
        user: user,
        message: message,
        time: new Date().toLocaleString()
    })
    saveData(data)
}

function getUserData(user)
{
    let data = loadData()
    let result = []

    for(let i = 0; i < data.length; i++)
    {
        if(data[i].user === user)
        {
            result.push(data[i])
        }
    }

    return result
}

module.exports = { addData, getUserData }