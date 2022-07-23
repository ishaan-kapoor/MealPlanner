const router = require('express').Router()

const {
    add_user,
    edit_mealPlan
} = require('../controllers/user')

router.post('/', add_user)
router.patch('/:id', edit_mealPlan)

module.exports = router