function register()
{
    fetch("/api/auth/register",
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: ruser.value,
            password: rpass.value
        })
    })
    .then(res => res.json())
    .then(d => msg.innerText = d.message || d.error);
}

function login()
{
    fetch("/api/auth/login",
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: user.value,
            password: pass.value
        })
    })
    .then(res => res.json())
    .then(d =>
    {
        if (d.token)
        {
            localStorage.setItem("token", d.token);
            window.location = "dashboard.html";
        }
        else
        {
            msg.innerText = d.error;
        }
    });
}

function getUsers()
{
    fetch("/api/users",
    {
        headers: { Authorization: localStorage.getItem("token") }
    })
    .then(res => res.json())
    .then(d => output.innerText = JSON.stringify(d, null, 2));
}

function createUser()
{
    const name = prompt("Enter name");

    fetch("/api/users",
    {
        method: "POST",
        headers:
        {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token")
        },
        body: JSON.stringify({ name })
    })
    .then(res => res.json())
    .then(d => output.innerText = JSON.stringify(d, null, 2));
}

function logout()
{
    localStorage.removeItem("token");
    window.location = "/";
}