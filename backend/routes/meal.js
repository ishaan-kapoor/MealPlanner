const router = require('express').Router()

const {
    get_all_meals,
    make_meal,
    update_meal
} = require('../controllers/meal')

router.get('/', get_all_meals)
router.post('/', make_meal)
router.patch('/:id', update_meal)

module.exports = router