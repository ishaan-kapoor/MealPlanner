const mongoose = require('mongoose')

const User = require('../models/user')

function error404(res) { res.status(404).json({ err: 'No such User' }) }

async function addUser(req, res) {
    try {
        let { name, calorieRequirement, mealPlan } = req.body
        if (!mealPlan) { mealPlan = [] }
        const user = await User.create({
            name: name,
            calorieRequirement: calorieRequirement,
            mealPlan: mealPlan
        })
        res.status(200).json({ id: user._id })
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}

async function updateEntireMealPlan(req, res) {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) { return error404(res) }
    try {
        const { mealPlan } = req.body
        const user = await User.findByIdAndUpdate(id, { mealPlan: mealPlan })
        if (!user) { return error404(res) }
        res.status(200).json({ msg: "Updated meal plan" })
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}

async function updateMealPlan(req, res) {
    var { id, date } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) { return error404(res) }
    try {
        const { meals } = req.body
        const user = await User.findById(id)
        if (!user) { return error404(res) }
        date = new Date(date)
        mealObject = user.mealPlan.find(obj => { return obj.date.getTime() === date.getTime() })
        mealObject.meals = meals
        user.save()
        res.status(200).json({ msg: "Updated meal plan for given date" })
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}

async function addDate(req, res) {
    var { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) { return error404(res) }
    try {
        let { date } = req.body
        const user = await User.findById(id)
        if (!user) { return error404(res) }
        date = new Date(date)
        user.mealPlan.push({ "date": date, "meals": [] })
        user.save()
        res.status(200).json({ msg: "Added date to the meal plan" })
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}

async function removeDate(req, res) {
    var { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) { return error404(res) }
    try {
        let { date } = req.body
        const user = await User.findById(id)
        if (!user) { return error404(res) }
        date = new Date(date)
        mealObject = user.mealPlan.find(obj => { return obj.date.getTime() === date.getTime() })
        const index = user.mealPlan.indexOf(mealObject);
        if (index == -1) { return res.status(400).json({ err: "date not in the meal plan" }) }
        user.mealPlan.splice(index, 1)
        user.save()
        res.status(200).json({ msg: "Removed date from the meal plan" })
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}

async function addMeal(req, res) {
    var { id, date } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) { return error404(res) }
    try {
        const { meal } = req.body
        const user = await User.findById(id)
        if (!user) { return error404(res) }
        date = new Date(date)
        mealObject = user.mealPlan.find(obj => { return obj.date.getTime() === date.getTime() })
        if (!(mealObject)) { return error404(res) }
        mealObject.meals.push(meal)
        user.save()
        res.status(200).json({ msg: "Added meal to the meal plan for given date" })
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}

async function removeMeal(req, res) {
    var { id, date } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) { return error404(res) }
    try {
        const { meal } = req.body
        const user = await User.findById(id)
        if (!user) { return error404(res) }
        date = new Date(date)
        mealObject = user.mealPlan.find(obj => { return obj.date.getTime() === date.getTime() })
        if (!(mealObject)) { return error404(res) }
        const index = mealObject.meals.indexOf(meal);
        if (index == -1) { return res.status(400).json({ err: "meal not in the meal plan" }) }
        mealObject.meals.splice(index, 1)
        user.save()
        res.status(200).json({ msg: "Removed meal from the meal plan for given date" })
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}

module.exports = {
    addUser,
    addDate,
    removeDate,
    addMeal,
    removeMeal,
    updateMealPlan,
    updateEntireMealPlan
}