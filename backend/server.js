// imports
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

// constants
const PORT = process.env.PORT || 5000
const DB_URI = process.env.DATABASE_URI

const app = express()

app.use(express.json())
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next()
})  // Logs for debugging

// Routes
app.use('/api/food-item/', require('./routes/foodItem'))
app.use('/api/meal/', require('./routes/meal'))
app.use('/api/user/', require('./routes/user'))

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
