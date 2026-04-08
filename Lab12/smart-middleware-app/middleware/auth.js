module.exports = (req, res, next) =>
{
    const token = req.headers["authorization"];

    if (token === "loggedin")
    {
        next();
    }
    else
    {
        res.status(401).json({ error: "Unauthorized" });
    }
};