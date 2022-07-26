const router = require('express').Router()

const {
    addUser,
    addDate,
    removeDate,
    addMeal,
    removeMeal,
    updateMealPlan,
    updateEntireMealPlan
} = require('../controllers/user')

router.post('/add', addUser)
router.post('/add/:id', addDate)
router.post('/remove/:id', removeDate)
router.post('/add/:id/:date', addMeal)  // Can be used as patch method too.
router.post('/remove/:id/:date', removeMeal)  // Can be used as patch method too.
router.patch('/update/:id/', updateEntireMealPlan)
router.patch('/update/:id/:date', updateMealPlan)

module.exports = router