const API_BASE = 'http://localhost:3000';

const staticBooks =
[
{
title:"JavaScript Basics",
author:"John Smith",
category:"Programming",
price:450,
rating:4.5,
year:2021
},
{
title:"Node.js Complete Guide",
author:"David Miller",
category:"Programming",
price:550,
rating:4.7,
year:2022
},
{
title:"The Science of Space",
author:"Neil Tyson",
category:"Science",
price:400,
rating:4.3,
year:2020
},
{
title:"Atomic Habits",
author:"James Clear",
category:"Self-Help",
price:350,
rating:4.8,
year:2019
},
{
title:"The Great Fiction Story",
author:"Arthur Doyle",
category:"Fiction",
price:300,
rating:4.1,
year:2018
}
]

function displayBooks(books)
{
const container = document.getElementById('results')
container.innerHTML = ''

if(books.length === 0)
{
container.innerHTML = '<p>No books found.</p>'
return
}

books.forEach(function(book)
{

const div = document.createElement('div')
div.className = 'book'

div.innerHTML = `
<h3>${book.title}</h3>
<p><strong>Author:</strong> ${book.author}</p>
<p><strong>Category:</strong> ${book.category}</p>
<p><strong>Price:</strong> ₹${book.price}</p>
<p><strong>Rating:</strong> ${book.rating} / 5</p>
<p><small>Published: ${book.year}</small></p>
`

container.appendChild(div)

})
}

async function searchByTitle()
{

const title = document.getElementById('searchTitle').value.trim()

if(!title)
{
alert("Enter a title")
return
}

try
{
const res = await fetch(`${API_BASE}/books/search?title=${encodeURIComponent(title)}`)
const data = await res.json()
displayBooks(data)
}
catch(error)
{
const results = staticBooks.filter(function(book)
{
return book.title.toLowerCase().includes(title.toLowerCase())
})

displayBooks(results)
}

}

async function filterByCategory()
{

const cat = document.getElementById('category').value

if(!cat)
{
alert("Select a category")
return
}

try
{
const res = await fetch(`${API_BASE}/books/category/${encodeURIComponent(cat)}`)
const data = await res.json()
displayBooks(data)
}
catch(error)
{
const results = staticBooks.filter(function(book)
{
return book.category === cat
})

displayBooks(results)
}

}

async function sortBooks()
{

const val = document.getElementById('sortBy').value
const parts = val.split('-')

const by = parts[0]
const dir = parts[1]

try
{
const res = await fetch(`${API_BASE}/books/sort?by=${by}&order=${dir}`)
const data = await res.json()
displayBooks(data)
}
catch(error)
{

let sorted = [...staticBooks]

sorted.sort(function(a,b)
{

if(dir === "asc")
{
return a[by] - b[by]
}
else
{
return b[by] - a[by]
}

})

displayBooks(sorted)

}

}

async function showTopRated()
{

try
{
const res = await fetch(`${API_BASE}/books/top`)
const data = await res.json()
displayBooks(data)
}
catch(error)
{

const results = staticBooks
.filter(function(book)
{
return book.rating >= 4
})
.sort(function(a,b)
{
return b.rating - a.rating
})
.slice(0,5)

displayBooks(results)

}

}

window.onload = function()
{
displayBooks(staticBooks)
}