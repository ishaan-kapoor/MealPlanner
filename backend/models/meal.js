const mongoose = require('mongoose')

const meal_schema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ["Breakfast", "Lunch", "Evening Snack", "Dinner"]
    },
    name: { type: String, required: true },
    foodItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "FoodItem" }]
})

module.exports = mongoose.model('Meal', meal_schema)
