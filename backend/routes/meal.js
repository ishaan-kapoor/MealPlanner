const router = require('express').Router()

const {
    make_meal,
    update_meal,
    recommend_meal
} = require('../controllers/meal')

router.post('/', make_meal)
router.patch('/:id', update_meal)
router.get('/:calorieRequirement', recommend_meal)

module.exports = router