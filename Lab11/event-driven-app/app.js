const readline = require('readline-sync')
const chalk = require('chalk')

const logger = require('./events/userEvents')
require('./events/systemEvents')

const auth = require('./utils/auth')
const logToFile = require('./utils/fileLogger')
const asyncOperation = require('./utils/asyncTasks')
const dataStore = require('./utils/dataStore')

function menu()
{
    console.log(chalk.blue("\n===== EVENT APP ====="))
    console.log("1. Register")
    console.log("2. Login")
    console.log("3. Logout")
    console.log("4. Send Data")
    console.log("5. Fetch My Data")
    console.log("6. Async Task")
    console.log("7. Current User")
    console.log("8. Multi Listener")
    console.log("9. Exit")
}

while(true)
{
    menu()
    let ch = readline.question("Enter choice: ")

    if(ch == 1)
    {
        let u = readline.question("Username: ")
        let p = readline.question("Password: ")

        if(auth.register(u, p))
        {
            logger.emit('registerSuccess', u)
            logToFile("REGISTER: " + u)
        }
        else
        {
            logger.emit('registerFail')
        }
    }
    else if(ch == 2)
    {
        let u = readline.question("Username: ")
        let p = readline.question("Password: ")

        if(auth.login(u, p))
        {
            logger.emit('loginSuccess', u)
            logToFile("LOGIN: " + u)
        }
        else
        {
            logger.emit('loginFail')
        }
    }
    else if(ch == 3)
    {
        let u = readline.question("Username: ")

        if(auth.logout(u))
        {
            logger.emit('logoutSuccess', u)
            logToFile("LOGOUT: " + u)
        }
        else
        {
            logger.emit('logoutFail')
        }
    }
    else if(ch == 4)
    {
        let user = auth.getUser()

        if(user == null)
        {
            console.log(chalk.red("Login first"))
        }
        else
        {
            let msg = readline.question("Enter data: ")

            dataStore.addData(user, msg)

            logger.emit('dataSent', { user: user, msg: msg })
            logToFile("DATA: " + user + " -> " + msg)
        }
    }
    else if(ch == 5)
    {
        let user = auth.getUser()

        if(user == null)
        {
            console.log("Login first")
        }
        else
        {
            let data = dataStore.getUserData(user)
            logger.emit('dataFetched', data)
        }
    }
    else if(ch == 6)
    {
        asyncOperation()
    }
    else if(ch == 7)
    {
        console.log("Current User:", auth.getUser())
    }
    else if(ch == 8)
    {
        logger.emit('multiListener')
    }
    else if(ch == 9)
    {
        console.log("Exiting...")
        break
    }
}