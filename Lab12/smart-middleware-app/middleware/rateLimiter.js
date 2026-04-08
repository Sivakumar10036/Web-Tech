let requests = {};

module.exports = (req, res, next) =>
{
    const ip = req.ip;

    requests[ip] = (requests[ip] || 0) + 1;

    if (requests[ip] > 200)
    {
        return res.status(429).json({ error: "Too many requests" });
    }

    next();
};