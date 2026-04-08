const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", auth, (req, res) =>
{
    res.json({ message: "Users fetched successfully" });
});

router.post("/", auth, (req, res) =>
{
    const { name } = req.body;

    if (!name)
        return res.status(400).json({ error: "Name required" });

    res.json({ message: "User created", user: name });
});

module.exports = router;