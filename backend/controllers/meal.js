const mongoose = require('mongoose')

const Meal = require('../models/meal')

const error_404 = (res) => {res.status(404).json({err: 'No such Meal'})}

const make_meal = async(req, res) => {
    try {
        const meal = await Meal.create({...req.body})
        res.status(200).json({id: meal._id})
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}

const update_meal = async(req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log("Invalid ID")
        return error_404(res)
    }
    try {
        const meal = await Meal.findOneAndUpdate({_id: id}, {...req.body})
        if (!meal) {
            return error_404(res)
        }
        res.status(200).json({msg: "Updated Meal"})
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}

module.exports = {
    make_meal,
    update_meal
}