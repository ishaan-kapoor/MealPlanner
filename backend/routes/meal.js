const router = require('express').Router()

router.get('/', (req, res) => {
    res.status(200).json({ msg: "Get meal Working!" })
})
router.post('/', (req, res) => {
    res.status(200).json({ msg: "Post meal Working!", data: req.body})
})

module.exports = router