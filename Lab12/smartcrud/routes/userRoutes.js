const express = require("express")
const router = express.Router()
const DataUser = require("../models/DataUser")

router.post("/", async function (req, res)
{
    const user = await DataUser.create(req.body)
    res.json(user)
})

router.get("/", async function (req, res)
{
    const users = await DataUser.find()
    res.json(users)
})

router.put("/:id", async function (req, res)
{
    const updated = await DataUser.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updated)
})

router.delete("/:id", async function (req, res)
{
    await DataUser.findByIdAndDelete(req.params.id)
    res.json({ message: "Deleted" })
})

module.exports = router