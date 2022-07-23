const mongoose = require('mongoose')

const foodItem_schema = new mongoose.Schema({
    name: { type: String, required: true },
    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    carb: { type: Number, required: true },
    fat: { type: Number, required: true },
    acceptedUnits: {
        type: [String],
        enum: [
            "mililiter",
            "liter",
            "kilograms",
            "grams",
            "item"
        ],
        required: true
    },
    itemWeight: { type: Number, required: true }
})

module.exports = mongoose.model('FoodItem', foodItem_schema)