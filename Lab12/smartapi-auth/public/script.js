function register()
{
    fetch("/api/auth/register",
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: rname.value,
            email: remail.value,
            password: rpass.value
        })
    })
    .then(res => res.text())
    .then(msg => alert(msg));
}

function login()
{
    fetch("/api/auth/login",
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: lemail.value,
            password: lpass.value
        })
    })
    .then(res => res.json())
    .then(data =>
    {
        alert(data.message || data);
    });
}

function loadUsers()
{
    fetch("/api/users")
    .then(res => res.json())
    .then(data =>
    {
        const list = document.getElementById("users");
        list.innerHTML = "";

        const searchText = search.value.toLowerCase();

        data.forEach(function(u)
        {
            if(u.name.toLowerCase().includes(searchText))
            {
                const li = document.createElement("li");
                li.innerHTML = u.name + " - " + u.email +
                " <button onclick='deleteUser(" + u.id + ")'>Delete</button>";
                list.appendChild(li);
            }
        });
    });
}

function deleteUser(id)
{
    fetch("/api/users/" + id,
    {
        method: "DELETE"
    })
    .then(res => res.text())
    .then(msg =>
    {
        alert(msg);
        loadUsers();
    });
}