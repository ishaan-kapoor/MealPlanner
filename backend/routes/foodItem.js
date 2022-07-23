const router = require('express').Router()

const {
    get_all_foodItems,
    add_foodItem
} = require('../controllers/foodItem')

router.get('/', get_all_foodItems)
router.post('/', add_foodItem)

module.exports = router