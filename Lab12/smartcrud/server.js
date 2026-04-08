const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const fs = require("fs")

const User = require("./models/User")

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.static("public"))

mongoose.connect("mongodb://127.0.0.1:27017/smartcrud")

mongoose.connection.on("connected", function ()
{
    console.log("MongoDB Connected")
})

// REGISTER
app.post("/register", async function (req, res)
{
    try
    {
        const user = await User.create(req.body)
        fs.appendFileSync("logs/log.txt", `REGISTER: ${user.username}\n`)
        res.json({ success: true })
    }
    catch
    {
        res.json({ success: false })
    }
})

// LOGIN
app.post("/login", async function (req, res)
{
    const user = await User.findOne(
    {
        username: req.body.username,
        password: req.body.password
    })

    if (user)
    {
        res.json({ success: true })
    }
    else
    {
        res.json({ success: false })
    }
})

const userRoutes = require("./routes/userRoutes")
app.use("/api/users", userRoutes)

app.listen(3000, function ()
{
    console.log("🚀 http://localhost:3000")
})