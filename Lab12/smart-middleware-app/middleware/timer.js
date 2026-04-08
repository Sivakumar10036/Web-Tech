module.exports = (req, res, next) =>
{
    const start = Date.now();

    res.on("finish", () =>
    {
        console.log("Time:", Date.now() - start, "ms");
    });

    next();
};