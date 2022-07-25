const mongoose = require('mongoose')

const Meal = require('../models/meal')
const FoodItem = require('../models/foodItem')

const error_404 = (res) => { res.status(404).json({ err: 'No such Meal' }) }

const make_meal = async (req, res) => {
    try {
        const meal = await Meal.create({ ...req.body })
        res.status(200).json({ meal: meal._id })
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}

const update_meal = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) { return error_404(res) }
    try {
        const meal = await Meal.findOneAndUpdate({ _id: id }, { ...req.body })
        if (!meal) { return error_404(res) }
        res.status(200).json({ msg: "Updated Meal" })
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}

function conditionSatistied(calorieRequirement, totalCalories, totalProtein) {
    return (
        ((calorieRequirement - 100 <= totalCalories) && (totalCalories <= calorieRequirement + 100))
        &&
        ((totalCalories * 0.2 <= totalProtein) && (totalProtein <= totalCalories * 0.3))
    )
}

async function randomFoodItem() {
    const food = await FoodItem.aggregate([{ $sample: { size: 1 } }])
    return food[0]
}
function randomMealCategory() {
    return ["Breakfast", "Lunch", "Evening Snack", "Dinner"][Math.ceil(Math.random() * 3)]
}
async function randomMealName() {
    const name = "recommended meal (" + Math.ceil(Math.random() * 1e14) + ")"
    const meal = await Meal.findOne({ name: name })
    if (meal) { return randomMealName() }
    return name
}

const recommend_meal = async (req, res) => {
    // return res.status(200).json({ meal: await randomFoodItem(), msg: 0 })
    // This will not work because the food database
    // (https://jtmadhavan.files.wordpress.com/2009/09/the-calorie-chart-of-indian-food.pdf)
    // has no food item with 20-30% protein by weight of its calories.
    // Thus, the meal made by these food items can never have the amount of
    // protein within 20-30% by weight of the total calories.
    const { calorieRequirement } = req.params
    if (isNaN(calorieRequirement)) { return res.status(400).json({ err: "Invalid calorieRequirement" }) }
    try {
        let totalProtein = 0
        let totalCalories = 0
        const foodItems = []
        let foodItem = null
        let i = 0

        // Functions to be used with reduce to get respective foodItems
        const highestCalorie = (prev, curr) => prev.calories < curr.calories ? prev : curr
        const highestProtein_perCalorie = (prev, curr) => (prev.protein / prev.calories) < (curr.protein / curr.calories) ? prev : curr
        const lowestProtein_perCalorie = (prev, curr) => (prev.protein / prev.calories) > (curr.protein / curr.calories) ? prev : curr

        while (!conditionSatistied(calorieRequirement, totalCalories, totalProtein)) {
            totalCalories = Number(totalCalories.toFixed(1))
            totalProtein = Number(totalProtein.toFixed(1))
            if (calorieRequirement - 100 > totalCalories) { // Low calorie
                foodItem = await randomFoodItem()
                const { calories, protein } = foodItem
                totalProtein += protein
                totalCalories += calories
                foodItems.push(foodItem)
            }
            // else if (calorieRequirement + 100 < totalCalories) { // High Calorie
            //     const foodItem = foodItems.reduce((prev, curr) => prev.calories < curr.calories ? prev : curr)
            //     const { calories, protein } = foodItem
            //     totalProtein -= protein
            //     totalCalories -= calories
            //     const index = foodItems.indexOf(foodItem);
            //     foodItems.splice(index, 1)
            // }
            // else if (totalCalories * 0.3 < totalProtein) { // High Protein
            //     const foodItem = foodItems.reduce((prev, curr) => (prev.protein / prev.calories) < (curr.protein / curr.calories) ? prev : curr)
            //     const { calories, protein } = foodItem
            //     totalProtein -= protein
            //     totalCalories -= calories
            //     const index = foodItems.indexOf(foodItem);
            //     foodItems.splice(index, 1)
            // }
            // else if (totalCalories * 0.2 > totalProtein) { // Low Protein
            //     const foodItem = foodItems.reduce((prev, curr) => (prev.protein / prev.calories) > (curr.protein / curr.calories) ? prev : curr)
            //     const { calories, protein } = foodItem
            //     totalProtein -= protein
            //     totalCalories -= calories
            //     const index = foodItems.indexOf(foodItem);
            //     foodItems.splice(index, 1)
            // }
            else {
                if (calorieRequirement + 100 < totalCalories) { foodItem = foodItems.reduce(highestCalorie) } // High Calorie
                else if (totalCalories * 0.3 < totalProtein) { foodItem = foodItems.reduce(highestProtein_perCalorie) } // High Protein
                else if (totalCalories * 0.2 > totalProtein) { foodItem = foodItems.reduce(lowestProtein_perCalorie) } // Low Protein
                
                const { calories, protein } = foodItem
                totalProtein -= protein
                totalCalories -= calories
                const index = foodItems.indexOf(foodItem);
                foodItems.splice(index, 1)
            }
            i += 1
            if (i > 200) { break }
        }
        const meal = await Meal.create({ category: randomMealCategory(), name: await randomMealName(), foodItems: foodItems.map((x) => x._id) })
        res.status(200).json({ meal: meal._id })
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}

module.exports = {
    make_meal,
    update_meal,
    recommend_meal
}