// imports
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

// constants
const PORT = process.env.PORT || 5000
const DB_URI = process.env.DATABASE_URI

// express app
const app = express()
app.use(express.json())

// routes
app.use('/api/food-item/', require('./routes/foodItem'))
app.use('/api/meal/', require('./routes/meal'))
app.use('/api/user/', require('./routes/user'))

// main
mongoose.connect(DB_URI)
    .then(() => {
        console.log('connected to DataBase')
        app.listen(PORT, () => {
            console.log('listening on port:', PORT)
        })
    })
    .catch((error) => {
        console.log('could not connect to DataBase\n')
        console.log(error)
        console.log('\ncould not connect to DataBase')
    })
