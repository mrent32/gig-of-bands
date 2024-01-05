const router = require('express').Router()
const { Bands } = require('../../models')

router.get('/', async (req, res) => {
    try {
        const bandData = await Bands.findAll({ attributes: { exclude: ['username', 'password'] } })

        const bands = bandData.map((band) => band.get({ plain: true }))
        console.log(bands)
        
        res.render('performers', {
            bands
        })
    } catch(err) {
        res.status(400).json(err)
    }
})

module.exports = router
