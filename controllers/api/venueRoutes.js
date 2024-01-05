const router = require('express').Router()
const { Venues } = require('../../models')
const withAuth = require('../../utils/auth')

router.get('/', async (req, res) => {
    try {
        const venueData = await Venues.findAll({ attributes: { exclude: ['username', 'password'] } })

        const venues = venueData.map((venue) => venue.get({ plain: true }))
        
        res.render('venues', {
            venues
        })
    } catch(err) {
        res.status(400).json(err)
    }
})


router.delete('/:id', withAuth, async (req, res) => {
    try {
        const venueData = await Venues.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if(!venueData) {
            res.status(404).json({ message: 'No gig found with this id!' });
            return;
        }
        res.status(200).json(venueData);
        } catch (err) {
            res.status(500).json(err);
        }
});

module.exports = router
