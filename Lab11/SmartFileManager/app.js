const fs = require("fs").promises
const readline = require("readline")

const rl = readline.createInterface(
{
    input: process.stdin,
    output: process.stdout
})

function ask(q)
{
    return new Promise((res) =>
    {
        rl.question(q, (ans) =>
        {
            res(ans)
        })
    })
}

async function run()
{
    console.log("\n===== SMART FILE MANAGER =====\n")

    while(true)
    {
        console.log("1. Create File")
        console.log("2. Read File")
        console.log("3. Append File")
        console.log("4. Delete File")
        console.log("5. List Files")
        console.log("6. Rename File")
        console.log("7. Create Folder")
        console.log("8. Exit\n")

        let choice = await ask("Enter your choice: ")

        try
        {
            if(choice == 1)
            {
                let name = await ask("Enter file name: ")
                let content = await ask("Enter content: ")

                await fs.writeFile(name, content)
                console.log("File created successfully\n")
            }

            else if(choice == 2)
            {
                let name = await ask("Enter file name: ")

                let data = await fs.readFile(name, "utf8")
                console.log("\nFile Content:\n" + data + "\n")
            }

            else if(choice == 3)
            {
                let name = await ask("Enter file name: ")
                let content = await ask("Enter content to append: ")

                await fs.appendFile(name, content)
                console.log("Content appended successfully\n")
            }

            else if(choice == 4)
            {
                let name = await ask("Enter file name: ")

                await fs.unlink(name)
                console.log("File deleted successfully\n")
            }

            else if(choice == 5)
            {
                let files = await fs.readdir("./")
                console.log("\nFiles:\n" + files.join("\n") + "\n")
            }

            else if(choice == 6)
            {
                let oldName = await ask("Enter old file name: ")
                let newName = await ask("Enter new file name: ")

                await fs.rename(oldName, newName)
                console.log("File renamed successfully\n")
            }

            else if(choice == 7)
            {
                let name = await ask("Enter folder name: ")

                await fs.mkdir(name)
                console.log("Folder created successfully\n")
            }

            else if(choice == 8)
            {
                console.log("Exiting...")
                rl.close()
                break
            }

            else
            {
                console.log("Invalid choice\n")
            }
        }
        catch(err)
        {
            console.log("Error:", err.message, "\n")
        }
    }
}

run()