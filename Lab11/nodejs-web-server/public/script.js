function getTime()
{
    fetch("/api/time")
    .then(function(res)
    {
        return res.json();
    })
    .then(function(data)
    {
        document.getElementById("time").innerHTML = data.time;
    })
    .catch(function()
    {
        alert("Error fetching time");
    });
}

function greet()
{
    const name = document.getElementById("name").value;

    fetch("/api/greet?name=" + name)
    .then(function(res)
    {
        return res.json();
    })
    .then(function(data)
    {
        document.getElementById("greet").innerHTML = data.message;
    })
    .catch(function()
    {
        alert("Error greeting");
    });
}