const mongoose = require('mongoose')

const FoodItem = require('../models/foodItem')

function error404(res) { res.status(404).json({ err: 'No such food item' }) }

async function addFoodItem(req, res) {
    try {
        const foodItem = await FoodItem.create({ ...req.body })
        res.status(200).json({ id: foodItem._id })
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}

async function updateFoodItem(req, res) {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) { return error404(res) }
        const foodItem = await FoodItem.findByIdAndUpdate(id, { ...req.body })
        if (!foodItem) { return error404(res) }
        res.status(200).json({ msg: "Updated food item" })
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}

module.exports = {
    addFoodItem,
    updateFoodItem
}
