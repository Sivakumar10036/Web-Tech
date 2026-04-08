const fs = require("fs").promises

async function createFile(name, content)
{
    await fs.writeFile(name, content)
}

async function readFile(name)
{
    return await fs.readFile(name, "utf8")
}

async function appendFile(name, content)
{
    await fs.appendFile(name, content)
}

async function deleteFile(name)
{
    await fs.unlink(name)
}

async function listFiles()
{
    return await fs.readdir("./")
}

async function renameFile(oldName, newName)
{
    await fs.rename(oldName, newName)
}

async function createFolder(name)
{
    await fs.mkdir(name)
}

module.exports =
{
    createFile,
    readFile,
    appendFile,
    deleteFile,
    listFiles,
    renameFile,
    createFolder
}