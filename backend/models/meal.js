const mongoose = require('mongoose')
const foodItem = require('./foodItem')

const meal_schema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ["Breakfast", "Lunch", "Evening Snack", "Dinner"]
    },
    name: { type: String, required: true },
    foodItems: [foodItem]
})

module.exports = mongoose.model('Meal', meal_schema)
