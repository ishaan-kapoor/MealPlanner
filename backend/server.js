// imports
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

// constants
const PORT = process.env.PORT
const DB_URI = process.env.DATABASE_URI

const app = express()

app.use(express.json())
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next()
})  // Logs for debugging

// Tests
app.get('/', (req, res) => {
    res.status(200).json({ msg: "Get Working!" })
})
app.post('/', (req, res) => {
    res.status(200).json({ msg: "Post Working!", data: req.body})
})

// Main
mongoose.connect(DB_URI)
    .then(() => {
        console.log('connected to db')
        app.listen(PORT, () => {
            console.log('listening on port:', PORT)
        })
    })
    .catch((error) => {
        console.log('could not connect to db')
        console.log(error)
    })
