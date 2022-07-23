const router = require('express').Router()

router.get('/', (req, res) => {
    res.status(200).json({ msg: "Get user Working!" })
})
router.post('/', (req, res) => {
    res.status(200).json({ msg: "Post user Working!", data: req.body})
})

module.exports = router