const FoodItem = require('../models/foodItem')

const get_all_foodItems = async(req, res) => {
    try {
        const foodItems = await FoodItem.find({})
        res.status(200).json(foodItems)
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}

const add_foodItem = async(req, res) => {
    try {
        const foodItem = await FoodItem.create({...req.body})
        res.status(200).json(foodItem)
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}

module.exports = {
    get_all_foodItems,
    add_foodItem
}