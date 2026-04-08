const logger = require('./logger')
const chalk = require('chalk')

logger.on('dataSent', (data) =>
{
    console.log(chalk.yellow("📤 Data sent by " + data.user + ":"), data.msg)
})

logger.on('dataFetched', (list) =>
{
    console.log(chalk.green("\n📥 Your Data History:"))

    if(list.length === 0)
    {
        console.log("No data found")
    }
    else
    {
        for(let i = 0; i < list.length; i++)
        {
            console.log(list[i].time + " -> " + list[i].message)
        }
    }
})

logger.on('taskDone', (msg) =>
{
    console.log(chalk.green("✅ " + msg))
})

logger.on('error', (msg) =>
{
    console.log(chalk.bgRed.white(" ERROR: " + msg))
})

logger.on('multiListener', () =>
{
    console.log("Listener 1 executed")
})

logger.on('multiListener', () =>
{
    console.log("Listener 2 executed")
})

module.exports = logger