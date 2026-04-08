const fs = require('fs')

function logToFile(message)
{
    let time = new Date().toLocaleString()
    fs.appendFileSync('./data/logs.txt', "[" + time + "] " + message + "\n")
}

module.exports = logToFile