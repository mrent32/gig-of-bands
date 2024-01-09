const router = require('express').Router()
const { Bands, Venues } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/login', withAuth, async (req, res) => {
  try {
    console.log(req.body)
    let userData 
    if(req.body.dropbox == 'band') {
       userData = await Bands.findOne({ where: { username: req.body.username } });
    } else if(req.body.dropbox == 'venue') {
       userData = await Venues.findOne({ where: { username: req.body.username } });
    }
    
  
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
      res.render('profile')
    });

  } catch (err) {
    res.status(400).json(err);
  }
});


router.post('/login', async (req, res) => {
  try {
    const userData = await Bands.findOne({ where: { username: req.body.name } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end()
    })
  } else {
    res.status(404).end()
  }
})

router.post('/:id', async (req, res) => {
  try {
    if (req.params.id == 1) {
      const bandData = await Bands.create({name: req.body.bandName, genre: req.body.bandgenre, username: req.body.bandUsername, password: req.body.bandPassword});
      
      req.session.save(() => {
        req.session.user_id = bandData.id;
        req.session.logged_in = true
      })
      
      res.status(200).json(bandData)
    } else if (req.params.id == 2) {
      const venueData = await Venues.create({name: req.body.venueName, username: req.body.venueUsername, password: req.body.venuePassword});
      console.log(venueData)

      req.session.save(() => {
        req.session.user_id = venueData.id;
        req.session.logged_in = true
      })

      res.status(200).json(venueData)
    }
  } catch (err) {
    res.status(400).json(err)
    console.log(err)
  }
})

module.exports = router;
