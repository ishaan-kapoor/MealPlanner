const router = require('express').Router()

const {
    get_all_users,
    add_user,
    edit_mealPlan,
    add_meal
} = require('../controllers/user')

router.get('/', get_all_users)
router.post('/', add_user)
router.patch('/:id', edit_mealPlan)
router.patch('/:id', add_meal)

module.exports = router