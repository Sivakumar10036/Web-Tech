const express = require("express");
const path = require("path");

const logger = require("./middleware/logger");
const timer = require("./middleware/timer");
const rateLimiter = require("./middleware/rateLimiter");
const authLogger = require("./middleware/authLogger");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.use(logger);
app.use(timer);
app.use(rateLimiter);

app.use("/api/auth", authLogger, authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) =>
{
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(3000, () =>
{
    console.log("🚀 Running at http://localhost:3000");
});