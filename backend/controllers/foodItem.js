const FoodItem = require('../models/foodItem')

const add_foodItem = async (req, res) => {
    try {
        const foodItem = await FoodItem.create({ ...req.body })
        res.status(200).json({id: foodItem._id})
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}

module.exports = add_foodItem
