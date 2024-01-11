const router = require('express').Router()
const { Bands } = require('../../models')

router.get('/', async (req, res) => {
    try {
        console.log('started')
        const bandData = await Bands.findAll({ attributes: { exclude: ['username', 'password'] } })

        const bands = bandData.map((band) => band.get({ plain: true }))
        
        res.render('performers', {
            bands,
            logged_in: req.session.logged_in
        })
    } catch(err) {
        res.status(400).json(err)
    }
})

module.exports = router
