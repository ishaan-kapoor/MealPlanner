const mongoose = require('mongoose')
const Meal = require('./meal')

const user_schema = new mongoose.Schema({
    name: { type: String, required: true },
    calorieRequirement: { type: Number, required: true },
    mealPlan: [{
        date: { type: Date, required: true},
        ref: { type: Meal, required: true}
    }]
})

module.exports = mongoose.model('User', user_schema)