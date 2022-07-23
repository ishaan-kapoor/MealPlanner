const router = require('express').Router()

const add_foodItem = require('../controllers/foodItem')

router.post('/', add_foodItem)

module.exports = router