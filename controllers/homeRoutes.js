const router = require('express').Router();
const { Gigs, Bands, Venues } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const gigData = await Gigs.findAll({
      include: [{ model: Bands, attributes: { exclude: ['username', 'password']} }, { model: Venues, attributes: { exclude: ['username', 'password']} }]
    })

    const events = gigData.map((gig) => gig.get({ plain: true }))

    res.render('homepage', { 
      events,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/project/:id', async (req, res) => {
  try {
    const gigData = await Gigs.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = gigData.get({ plain: true });

    res.render('performers', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    console.log("user id", req.session.user_id)
    // Find the logged in user based on the session ID
    const userData = await Bands.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Gigs }],
    });

    const band = userData.get({ plain: true });

    res.render('profile', {
      
      ...band,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;
