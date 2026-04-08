const API_BASE_URL = "http://localhost:3000"

let currentNotes = []
let deleteId = null

const noteForm = document.getElementById("noteForm")
const notesContainer = document.getElementById("notesContainer")

const editModal = document.getElementById("editModal")
const editForm = document.getElementById("editForm")

const deleteModal = document.getElementById("deleteModal")

const closeBtn = document.querySelector(".close-btn")

const searchInput = document.getElementById("searchNotes")
const filterSubject = document.getElementById("filterSubject")

const totalNotes = document.getElementById("totalNotes")
const totalSubjects = document.getElementById("totalSubjects")
const lastUpdated = document.getElementById("lastUpdated")

document.addEventListener("DOMContentLoaded", () =>
{
fetchNotes()
})

noteForm.addEventListener("submit", handleAddNote)
editForm.addEventListener("submit", handleEditNote)

closeBtn.addEventListener("click", () =>
{
editModal.style.display = "none"
})

window.addEventListener("click", (event) =>
{
if(event.target === editModal)
{
editModal.style.display = "none"
}
})

/* SEARCH */

searchInput.addEventListener("input", () =>
{
const text = searchInput.value.toLowerCase()

const filtered = currentNotes.filter(note =>
note.title.toLowerCase().includes(text) ||
note.description.toLowerCase().includes(text)
)

renderNotes(filtered)
})

/* FILTER */

filterSubject.addEventListener("change", () =>
{
const subject = filterSubject.value

if(subject === "")
{
renderNotes(currentNotes)
return
}

const filtered = currentNotes.filter(n => n.subject === subject)

renderNotes(filtered)
})

/* SORT */

document.getElementById("sortDate").addEventListener("click", () =>
{
const sorted = [...currentNotes].sort((a,b)=>
new Date(b.created_date) - new Date(a.created_date)
)

renderNotes(sorted)
})

document.getElementById("sortPriority").addEventListener("click", () =>
{

const order = {High:3, Medium:2, Low:1}

const sorted = [...currentNotes].sort((a,b)=>
order[b.priority] - order[a.priority]
)

renderNotes(sorted)
})

/* CLEAR ALL */

document.getElementById("clearAll").addEventListener("click", async () =>
{

if(!confirm("Delete all notes?"))
{
return
}

try
{
await fetch(`${API_BASE_URL}/notes`, {method:"DELETE"})
fetchNotes()
}
catch(error)
{
showError("Failed to delete notes")
}

})

/* DARK MODE */

document.getElementById("darkModeToggle").addEventListener("click", () =>
{
document.body.classList.toggle("dark-mode")
})

/* FETCH NOTES */

async function fetchNotes()
{

try
{
showLoading()

const response = await fetch(`${API_BASE_URL}/notes`)

if(!response.ok)
{
throw new Error("Failed to fetch notes")
}

const notes = await response.json()

currentNotes = notes

renderNotes(notes)

updateStats()

}

catch(error)
{
showError("Failed to load notes")
console.error(error)
}

}

/* RENDER NOTES */

function renderNotes(notes)
{

if(notes.length === 0)
{
notesContainer.innerHTML =
'<p class="no-notes">No notes found</p>'
return
}

notesContainer.innerHTML = notes.map(note =>

`
<div class="note-card">

<h3 class="note-title">${escapeHtml(note.title)}</h3>

<p class="note-subject">📚 ${escapeHtml(note.subject)}</p>

<p class="note-description">${escapeHtml(note.description)}</p>

<p class="note-date">📅 ${note.created_date}</p>

<div class="note-actions">

<button onclick="openEditModal('${note._id}')" class="btn-edit">
Edit
</button>

<button onclick="deleteNote('${note._id}')" class="btn-delete">
Delete
</button>

</div>

</div>

`

).join("")

}

/* ADD NOTE */

async function handleAddNote(event)
{

event.preventDefault()

const title = document.getElementById("title").value.trim()
const subject = document.getElementById("subject").value.trim()
const description = document.getElementById("description").value.trim()

if(!title || !subject || !description)
{
showError("Please fill all fields")
return
}

try
{

const response = await fetch(`${API_BASE_URL}/notes`,
{
method:"POST",
headers:
{
"Content-Type":"application/json"
},
body:JSON.stringify({title,subject,description})
})

if(!response.ok)
{
throw new Error("Add failed")
}

noteForm.reset()

fetchNotes()

showSuccess("Note added successfully")

}

catch(error)
{
showError("Failed to add note")
}

}

/* OPEN EDIT */

function openEditModal(id)
{

const note = currentNotes.find(n => n._id === id)

document.getElementById("editNoteId").value = note._id
document.getElementById("editTitle").value = note.title
document.getElementById("editSubject").value = note.subject
document.getElementById("editDescription").value = note.description

editModal.style.display = "block"

}

/* EDIT NOTE */

async function handleEditNote(event)
{

event.preventDefault()

const id = document.getElementById("editNoteId").value

const title = document.getElementById("editTitle").value
const description = document.getElementById("editDescription").value

try
{

const response = await fetch(`${API_BASE_URL}/notes/${id}`,
{
method:"PUT",
headers:
{
"Content-Type":"application/json"
},
body:JSON.stringify({title,description})
})

if(!response.ok)
{
throw new Error("Update failed")
}

editModal.style.display = "none"

fetchNotes()

showSuccess("Note updated")

}

catch(error)
{
showError("Update failed")
}

}

/* DELETE NOTE */

async function deleteNote(id)
{

if(!confirm("Delete this note?"))
{
return
}

try
{

const response = await fetch(`${API_BASE_URL}/notes/${id}`,
{
method:"DELETE"
})

if(!response.ok)
{
throw new Error("Delete failed")
}

fetchNotes()

showSuccess("Note deleted")

}

catch(error)
{
showError("Delete failed")
}

}

/* UPDATE STATS */

function updateStats()
{

totalNotes.textContent = currentNotes.length

const subjects =
[...new Set(currentNotes.map(n => n.subject))]

totalSubjects.textContent = subjects.length

if(currentNotes.length > 0)
{
lastUpdated.textContent =
currentNotes[0].created_date
}

}

/* SECURITY */

function escapeHtml(text)
{

return text
.replace(/&/g,"&amp;")
.replace(/</g,"&lt;")
.replace(/>/g,"&gt;")
.replace(/"/g,"&quot;")
.replace(/'/g,"&#039;")

}

/* UI */

function showLoading()
{
notesContainer.innerHTML =
'<div class="loading">Loading notes...</div>'
}

function showError(msg)
{
alert(msg)
}

function showSuccess(msg)
{
alert(msg)
}