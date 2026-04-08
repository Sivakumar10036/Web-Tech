function getTime()
{
    fetch("/api/time")
    .then(res => res.json())
    .then(data =>
    {
        document.getElementById("time").innerHTML = data.time;
    });
}

function greet()
{
    const name = document.getElementById("name").value;

    fetch("/api/greet?name=" + name)
    .then(res => res.json())
    .then(data =>
    {
        document.getElementById("greet").innerHTML = data.message;
    });
}