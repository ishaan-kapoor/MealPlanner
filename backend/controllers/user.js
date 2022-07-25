const mongoose = require('mongoose')

const User = require('../models/user')

const error_404 = (res) => { res.status(404).json({ err: 'No such User' }) }

const add_user = async (req, res) => {
    try {
        const { name, calorieRequirement } = req.body
        let { mealPlan } = req.body
        if (!mealPlan) { mealPlan = [] }
        const user = await User.create({
            name: name,
            calorieRequirement: calorieRequirement,
            mealPlan: mealPlan
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}

const edit_mealPlan = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) { return error_404(res) }
    try {
        const { mealPlan } = req.body
        const user = await User.findOneAndUpdate({ _id: id }, { mealPlan: mealPlan })
        if (!user) { return error_404(res) }
        res.status(200).json({ msg: "Updated meal plan" })
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}

module.exports = {
    add_user,
    edit_mealPlan,
}