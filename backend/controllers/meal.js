const mongoose = require('mongoose')

const Meal = require('../models/meal')
const FoodItem = require('../models/foodItem')

function error404(res) { res.status(404).json({ err: 'No such Meal' }) }  // for 404 messages

async function makeMeal(req, res) {
    try {
        const meal = await Meal.create({ ...req.body })
        res.status(200).json({ id: meal._id })
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}

async function updateMeal(req, res) {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) { return error404(res) }
    try {
        const meal = await Meal.findByIdAndUpdate(id, { ...req.body })
        if (!meal) { return error404(res) }
        res.status(200).json({ msg: "Updated Meal" })
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}

async function addFoodItem(req, res) {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) { return error404(res) }
    try {
        const { foodItem } = req.body
        if (!mongoose.Types.ObjectId.isValid(foodItem)) { return res.status(400).json({ err: "not a valid foodItem" }) }
        const meal = await Meal.findById(id)
        if (!meal) { return error404(res) }
        meal.foodItems.push(foodItem)
        meal.save()
        res.status(200).json({ msg: "Added food item to Meal" })
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}

async function removeFoodItem(req, res) {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) { return error404(res) }
    try {
        const { foodItem } = req.body
        if (!mongoose.Types.ObjectId.isValid(foodItem)) { return res.status(400).json({ err: "not a valid foodItem" }) }
        const meal = await Meal.findById(id)
        if (!meal) { return error404(res) }
        const index = meal.foodItems.indexOf(foodItem);
        if (index == -1) { return res.status(400).json({ err: "foodItem not in the meal" }) }
        meal.foodItems.splice(index, 1)
        meal.save()
        res.status(200).json({ msg: "Removed food item from Meal" })
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}

const validMealCategories = ["Breakfast", "Lunch", "Evening Snack", "Dinner"]  // valid meal categories as specified in the meal model
function conditionSatisfied(calorieRequirement, totalCalories, totalProtein) {
    return (
        ((calorieRequirement - 100) <= totalCalories) &&
        (totalCalories <= (calorieRequirement + 100)) &&
        ((totalCalories * 0.05) <= totalProtein) && // ((totalCalories * 0.2) <= (totalProtein * 4))
        (totalProtein <= (totalCalories * 0.075)) // ((totalProtein * 4) <= (totalCalories * 0.3))
    )
}  // returns a boolean value that checks wether the meal has appropreate amounts of calories and proteins
async function randomFoodItem() {  // To add randomness in the meal
    return (await FoodItem.aggregate([{ $sample: { size: 1 } }]))[0]
}  // returns a random valid meal category
function randomMealCategory() {  // To be used in case no category is provided for the meal
    return validMealCategories[Math.floor(Math.random() * validMealCategories.length)]
}
async function randomMealName() { // To be used in case no name is provided for the meal
    const name = "recommended meal (" + Math.ceil(Math.random() * 1e14) + ")"
    const meal = await Meal.findOne({ name: name })
    if (meal) { return randomMealName() } // To avoid duplicate meal names
    return name
}  // returns a random meal name which is not present in the database
async function randomFoodItem_favouredProteinCalorieRatio(totalItems, favourFactor = 2, reverse = false) {
    return (await FoodItem.aggregate([
        { "$addFields": { "proteinCalorieRatio": { $divide: ["$protein", "$calories"] } } },
        { $sort: { proteinCalorieRatio: (reverse ? -1 : 1) } }
    ]).skip(Math.ceil(Math.random() * Math.floor(totalItems / (favourFactor || 1)))).limit(1))[0]
}  // returns a random food item which is one of the highest/lowest in protein to calorie ratio in the database
async function randomFoodItem_lowCalorie(totalItems, favourFactor = 2) {
    return (await FoodItem.find().sort({ "calories": 1 }).skip(Math.ceil(Math.random() * Math.floor(totalItems / (favourFactor || 1)))).limit(1))[0]
}  // returns a random food item which is one of the lowest in calories in the database
function countVarieties(foodItems) {
    return (new Set(foodItems.map((x) => x._id))).size
}  // returns the number of different items in the meal

async function recommendMeal(req, res) {
    let { calorieRequirement } = req.params
    if (isNaN(calorieRequirement)) { return res.status(400).json({ err: "Invalid calorie requirement" }) }
    calorieRequirement = Number(calorieRequirement)
    if (calorieRequirement < 0) { return res.status(400).json({ err: "Negative calorie requirement!" }) } // Absolute value can be used
    if (calorieRequirement < 100) { return res.status(400).json({ err: "calorie requirement tolerance is +-100, thus, you will get an empty meal" }) } // An empty meal can be given but it will take up unnecessary space in the database

    let totalProtein = 0  // sum of proteins of all foodItems in the array
    let totalCalories = 0  // sum of calories of all foodItems in the array
    const foodItems = []  // Array wiwh instances of FoodItem
    let favourFactor = 2  // Higher the favour factor, lower the randomness
    let i = 0

    let totalFoodItems = 0
    try { totalFoodItems = await FoodItem.estimatedDocumentCount() }
    catch { totalFoodItems = 20 }

    let removeFoodItem = null  // foodItem to be removed
    let addFoodItem = null  // foodItem to be added

    // Functions to be used with reduce to get respective foodItems
    const highestCalorie = (prev, curr) => prev.calories < curr.calories ? prev : curr
    const highestProteinPerCalorie = (prev, curr) => (prev.protein / prev.calories) < (curr.protein / curr.calories) ? prev : curr
    const lowestProteinPerCalorie = (prev, curr) => (prev.protein / prev.calories) > (curr.protein / curr.calories) ? prev : curr

    try {  // To atleast know what went wrong in case something goes wrong
        while (!conditionSatisfied(calorieRequirement, totalCalories, totalProtein)) {

            if (calorieRequirement - 100 > totalCalories) { // Low calorie
                removeFoodItem = null  // Just for symmetry
                addFoodItem = await randomFoodItem()
            }
            else if (calorieRequirement + 100 < totalCalories) { // High Calorie
                removeFoodItem = await foodItems.reduce(highestCalorie)
                addFoodItem = await randomFoodItem_lowCalorie(totalFoodItems, favourFactor)
            }
            else if (totalCalories * 0.3 < totalProtein * 4) { // High Protein
                removeFoodItem = await foodItems.reduce(highestProteinPerCalorie)
                addFoodItem = await randomFoodItem_favouredProteinCalorieRatio(totalFoodItems, favourFactor)
            }
            else if (totalCalories * 0.2 > totalProtein * 4) { // Low Protein
                removeFoodItem = await foodItems.reduce(lowestProteinPerCalorie)
                addFoodItem = await randomFoodItem_favouredProteinCalorieRatio(totalFoodItems, favourFactor, true)
            }

            if ((addFoodItem) && (removeFoodItem) && (removeFoodItem._id.toHexString() === addFoodItem._id.toHexString())) {
                removeFoodItem = foodItems[Math.floor(Math.random() * foodItems.length)]
                addFoodItem = await randomFoodItem()
            } // If the if-else ladder decides to add and remove the same item then spice the meal with some randomness
            if (addFoodItem) {
                let { calories, protein, itemWeight } = addFoodItem
                totalProtein += (protein * itemWeight / 100)
                totalCalories += (calories * itemWeight / 100)
                foodItems.push(addFoodItem)
                addFoodItem = null
            } // Adding the foodItem to the meal
            if (removeFoodItem) {
                let { calories, protein, itemWeight } = removeFoodItem
                totalProtein -= (protein * itemWeight / 100)
                totalCalories -= (calories * itemWeight / 100)
                const index = foodItems.indexOf(removeFoodItem);
                foodItems.splice(index, 1)
                removeFoodItem = null
            } // Removing the foodItem from the meal

            i += 1
            totalCalories = Number(totalCalories.toFixed(1)) // Rounding off
            totalProtein = Number(totalProtein.toFixed(1)) // Rounding off
            if (i % 100 == 0) { favourFactor *= 2 } // Decreasing randomness
            if (i > 300) { break } // In case it gets stuck in a loop. This will save some time on the cost of accuracy.
        }

        const variety = countVarieties(foodItems)  // number of different foodItems in the meal
        if ((variety < 2) || (variety > 5)) {  // checks if variety is in the recommended range
            return recommendMeal(req, res)  // This block makes the overall program slower.
        }  // If not, repeats the entire process.

        const { name, category } = req.body
        const meal = await Meal.create({ category: category || randomMealCategory(), name: name || await randomMealName(), foodItems: foodItems.map((x) => x._id) })
        res.status(200).json({ id: meal._id })  // Returning the id for further processing
    } catch (error) {
        res.status(400).json({ err: error.message })
    }
}

module.exports = {
    makeMeal,
    updateMeal,
    recommendMeal,
    addFoodItem,
    removeFoodItem
}