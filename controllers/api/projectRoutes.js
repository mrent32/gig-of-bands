const router = require('express').Router();
const { Gigs, Bands, Venues } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/gigs', async (req, res) => {
    try {
        const allGigs = await Gigs.findAll({ include: ({ model: Bands, Venues })
        });
        
        res.status(200).json(allGigs);
    } catch(err) {
        res.status(400).json(err)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const gigData = await Gigs.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if(!gigData) {
            res.status(404).json({ message: 'No gig found with this id!' });
            return;
        }
        res.status(200).json(gigData);
        } catch (err) {
            res.status(500).json(err);
        }
});

module.exports = router;
