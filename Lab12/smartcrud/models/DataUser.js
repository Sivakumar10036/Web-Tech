const mongoose = require("mongoose")

const dataUserSchema = new mongoose.Schema(
{
    name: String,
    email: String,
    age: Number
})

module.exports = mongoose.model("DataUser", dataUserSchema)