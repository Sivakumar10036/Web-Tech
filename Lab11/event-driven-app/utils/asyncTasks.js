const logger = require('../events/logger')

function asyncOperation()
{
    setTimeout(() =>
    {
        logger.emit('taskDone', "Async completed")
    }, 2000)
}

logger.on('taskDone', (msg) =>
{
    console.log(msg)
})

module.exports = asyncOperation