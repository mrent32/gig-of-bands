const router = require('express').Router()
const { Bands } = require('../../models')
const withAuth = require('../../utils/auth')

router.get('/', async (req, res) => {
    try {
        console.log('started')
        const bandData = await Bands.findAll({ attributes: { exclude: ['username', 'password'] } })

        const bands = bandData.map((band) => band.get({ plain: true }))
        
        res.render('performers', {
            bands
        })
    } catch(err) {
        res.status(400).json(err)
    }
})

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const bandData = await Bands.destroy({
            where: {
                id: req.params.id,
                // user_id: req.session.user_id,
            },
        });
        if(!bandData) {
            res.status(404).json({ message: 'No gig found with this id!' });
            return;
        }
        res.status(200).json(bandData);
        } catch (err) {
            res.status(500).json(err);
        }
});

module.exports = router
