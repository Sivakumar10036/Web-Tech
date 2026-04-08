const express = require("express");
const app = express();

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(3000, function()
{
    console.log("Server running on http://localhost:3000");
});