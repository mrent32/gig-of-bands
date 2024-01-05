const router = require('express').Router()
const { Venues } = require('../../models')

router.get('/', async (req, res) => {
    try {
        const venueData = await Venues.findAll({ attributes: { exclude: ['username', 'password'] } })

        const venues = venueData.map((venue) => venue.get({ plain: true }))
        console.log(venues)
        
        res.render('venues', {
            venues
        })
    } catch(err) {
        res.status(400).json(err)
    }
})

module.exports = router
