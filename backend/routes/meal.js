const router = require('express').Router()

const {
    makeMeal,
    updateMeal,
    recommendMeal,
    addFoodItem,
    removeFoodItem
} = require('../controllers/meal')

router.post('/make', makeMeal)
router.post('/:id/add', addFoodItem)
router.post('/:id/remove', removeFoodItem)  // delete method could have been used but was omitted for simplicity.
router.patch('/:id/update', updateMeal)
router.get('/recommend/:calorieRequirement', recommendMeal)

module.exports = router