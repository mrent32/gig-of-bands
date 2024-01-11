const router = require('express').Router()
const { Venues } = require('../../models')

router.get('/', async (req, res) => {
    try {
        const venueData = await Venues.findAll({ attributes: { exclude: ['username', 'password'] } })

        const venues = venueData.map((venue) => venue.get({ plain: true }))
        
        res.render('venues', {
            venues,
            logged_in: req.session.logged_in
        })
    } catch(err) {
        res.status(400).json(err)
    }
})

module.exports = router
