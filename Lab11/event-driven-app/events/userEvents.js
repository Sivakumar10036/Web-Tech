const logger = require('./logger')
const chalk = require('chalk')

logger.on('registerSuccess', (user) =>
{
    console.log(chalk.green("✔ Registered:"), user)
})

logger.on('registerFail', () =>
{
    console.log(chalk.red("✖ Username already exists"))
})

logger.on('loginSuccess', (user) =>
{
    console.log(chalk.green("✔ Login successful:"), user)
})

logger.on('loginFail', () =>
{
    console.log(chalk.red("✖ Invalid credentials"))
})

logger.on('logoutSuccess', (user) =>
{
    console.log(chalk.green("✔ Logout successful:"), user)
})

logger.on('logoutFail', () =>
{
    console.log(chalk.red("✖ Logout failed"))
})

module.exports = logger