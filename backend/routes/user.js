const router = require('express').Router()

const {
    add_user,
    edit_mealPlan,
    edit_entire_mealPlan
} = require('../controllers/user')

router.post('/', add_user)
router.patch('/:id/', edit_entire_mealPlan)
router.patch('/:id/:date', edit_mealPlan)

module.exports = router