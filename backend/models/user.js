const mongoose = require('mongoose')

const user_schema = new mongoose.Schema({
    name: { type: String, required: true },
    calorieRequirement: { type: Number, required: true },
    mealPlan: [{
        date: { type: Date, required: true},
        meal: { type: mongoose.Schema.Types.ObjectId, ref: "Meal", required: true}
    }]
})

module.exports = mongoose.model('User', user_schema)