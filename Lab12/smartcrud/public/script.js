let editId = null

function showRegister()
{
    document.getElementById("loginBox").style.display = "none"
    document.getElementById("registerBox").style.display = "block"
}

function showLogin()
{
    document.getElementById("registerBox").style.display = "none"
    document.getElementById("loginBox").style.display = "block"
}

function register()
{
    const username = document.getElementById("regUser").value
    const password = document.getElementById("regPass").value

    fetch("/register",
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data =>
    {
        alert(data.success ? "Registered" : "User exists")
    })
}

function login()
{
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    fetch("/login",
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data =>
    {
        if (data.success)
        {
            window.location = "dashboard.html"
        }
        else
        {
            alert("Invalid login")
        }
    })
}

function createUser()
{
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const age = document.getElementById("age").value

    fetch("/api/users",
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, age: Number(age) })
    })
    .then(() => getUsers())
}

function getUsers()
{
    fetch("/api/users")
    .then(res => res.json())
    .then(data =>
    {
        let output = ""

        data.forEach(user =>
        {
            output += `
            <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.age}</td>
            <td>
            <button onclick="openModal('${user._id}','${user.name}','${user.email}','${user.age}')">Edit</button>
            <button onclick="deleteUser('${user._id}')">Delete</button>
            </td>
            </tr>
            `
        })

        document.getElementById("output").innerHTML = output
    })
}

function deleteUser(id)
{
    fetch("/api/users/" + id, { method: "DELETE" })
    .then(() => getUsers())
}

function openModal(id, name, email, age)
{
    editId = id
    document.getElementById("editName").value = name
    document.getElementById("editEmail").value = email
    document.getElementById("editAge").value = age
    document.getElementById("modal").style.display = "flex"
}

function closeModal()
{
    document.getElementById("modal").style.display = "none"
}

function updateUser()
{
    const name = document.getElementById("editName").value
    const email = document.getElementById("editEmail").value
    const age = document.getElementById("editAge").value

    fetch("/api/users/" + editId,
    {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, age: Number(age) })
    })
    .then(() =>
    {
        closeModal()
        getUsers()
    })
}

window.onload = getUsers