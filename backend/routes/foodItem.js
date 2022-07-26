const router = require('express').Router()

const {
    addFoodItem,
    updateFoodItem
} = require('../controllers/foodItem')

router.post('/add', addFoodItem)
router.patch('/update/:id', updateFoodItem)
// One can consider removing add and update from the route because thats what post and patch do.
// I chose to add them for calrity.

module.exports = router