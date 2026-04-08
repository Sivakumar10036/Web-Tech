const fs = require("fs");
const path = "./data/logs.json";

function addLog(log)
{
    const logs = JSON.parse(fs.readFileSync(path));
    logs.push(log);
    fs.writeFileSync(path, JSON.stringify(logs, null, 2));
}

module.exports = { addLog };