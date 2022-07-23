const router = require('express').Router()

router.get('/', (req, res) => {
    res.status(200).json({ msg: "Get food-item Working!" })
})
router.post('/', (req, res) => {
    res.status(200).json({ msg: "Post food-item Working!", data: req.body})
})

module.exports = router