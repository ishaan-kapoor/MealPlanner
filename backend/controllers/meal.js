const FoodItem = require('../models/foodItem')
const Meal = require('../models/meal')

const error_404 = (res) => {res.status(404).json({err: 'No such Meal'})}

const get_all_meals = async(req, res) => {
    try {
        const meals = await Meal.find({})
        res.status(200).json(meals)
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}

const make_meal = async(req, res) => {
    try {
        const {category, name, foodItems} = req.body
        const meal = await Meal.create({
            category: category,
            name: name,
            foodItems: foodItems.map(x => FoodItem.findById(x))
        })
        res.status(200).json(meal)
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
        const {category, name, foodItems} = req.body
        const meal = await Meal.findOneAndUpdate({_id: id}, {
            category: category,
            name: name,
            foodItems: foodItems.map(x => FoodItem.findById(x))
        })
        if (!meal) {
            return error_404(res)
        }
        res.status(200).json({msg: "Updated Meal", meal: meal})
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}

module.exports = {
    get_all_meals,
    make_meal,
    update_meal
}