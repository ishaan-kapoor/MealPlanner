const User = require('../models/user')
const Meal = require('../models/meal')

const error_404 = (res) => {res.status(404).json({err: 'No such User'})}

const get_all_users = async(req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}

const add_user = async(req, res) => {
    try {
        const {name, calorieRequirement, meals} = req.body
        const user = await User.create({
            name: name,
            calorieRequirement: calorieRequirement,
            mealPlan: meals.map(function(x) {
                return {
                    date: {"$date": x.date},
                    ref: Meal.findById(x.id)
                }
            })
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}

const edit_mealPlan = async(req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log("Invalid ID")
        return error_404(res)
    }
    try {
        const {meals} = req.body
        const user = await User.findOneAndUpdate({_id: id}, {
            mealPlan: meals.map(function(x) {
                return {
                    date: {"$date": x.date},
                    ref: Meal.findById(x.id)
                }
            })
        })
        if (!user) {
            return error_404(res)
        }
        res.status(200).json({msg: "Updated meal plan"})
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}

const add_meal = async(req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log("Invalid ID")
        return error_404(res)
    }
    try {
        const {date, mealID} = req.body
        const user = await User.findById(id)
        if (!user) {
            return error_404(res)
        }
        user.mealPlan.push({ date: {"$date": date}, ref: Meal.findById(mealID)})
        user.save()
        res.status(200).json({msg: "Added meal plan to meal plan"})
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}

module.exports = {
    get_all_users,
    add_user,
    edit_mealPlan,
    add_meal
}