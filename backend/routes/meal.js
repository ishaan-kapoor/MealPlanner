const router = require('express').Router()

const {
    make_meal,
    update_meal
} = require('../controllers/meal')

router.post('/', make_meal)
router.patch('/:id', update_meal)

module.exports = router