const express = require('express')
const { MongoClient } = require('mongodb')
const cors = require('cors')
const path = require('path')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

const mongoUrl = "mongodb://127.0.0.1:27017"
const client = new MongoClient(mongoUrl)

let database
let booksCollection

async function connectDatabase()
{
await client.connect()

database = client.db("book_finder")

booksCollection = database.collection("books")

console.log("MongoDB connected successfully")
}

async function insertSampleBooks()
{
const count = await booksCollection.countDocuments()

if(count === 0)
{

await booksCollection.insertMany([
{
title:"JavaScript Basics",
author:"John Smith",
category:"Programming",
price:25,
rating:4.5
},
{
title:"Node.js Guide",
author:"David Miller",
category:"Programming",
price:30,
rating:4.7
},
{
title:"Science of Space",
author:"Neil Tyson",
category:"Science",
price:20,
rating:4.3
},
{
title:"Atomic Habits",
author:"James Clear",
category:"Self-Help",
price:18,
rating:4.8
},
{
title:"The Great Story",
author:"Arthur Doyle",
category:"Fiction",
price:15,
rating:4.1
},
{
title:"Learning MongoDB",
author:"Robert Lee",
category:"Programming",
price:22,
rating:4.2
}
])

console.log("Sample books inserted")
}
}

app.get("/books/search", async function(req,res)
{

const title = req.query.title

const books = await booksCollection.find({
title:
{
$regex:title,
$options:"i"
}
}).toArray()

res.json(books)

})

app.get("/books/category/:category", async function(req,res)
{

const category = req.params.category

const books = await booksCollection.find({
category:category
}).toArray()

res.json(books)

})

app.get("/books/sort", async function(req,res)
{

const sortBy = req.query.by
const order = req.query.order

let sortValue = 1

if(order === "desc")
{
sortValue = -1
}

let sortObject = {}

sortObject[sortBy] = sortValue

const books = await booksCollection.find().sort(sortObject).toArray()

res.json(books)

})

app.get("/books/top", async function(req,res)
{

const books = await booksCollection
.find({ rating:{ $gte:4 } })
.sort({ rating:-1 })
.limit(5)
.toArray()

res.json(books)

})

app.get("/books", async function(req,res)
{

let page = parseInt(req.query.page) || 1
let limit = parseInt(req.query.limit) || 5

const skip = (page-1) * limit

const books = await booksCollection
.find()
.skip(skip)
.limit(limit)
.toArray()

const total = await booksCollection.countDocuments()

res.json(
{
page:page,
limit:limit,
total:total,
totalPages:Math.ceil(total/limit),
data:books
})

})

connectDatabase().then(async function()
{

await insertSampleBooks()

app.listen(PORT,function()
{
console.log("Server running at http://localhost:3000")
})

})