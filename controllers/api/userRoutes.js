const router = require('express').Router()
const { Bands, Venues } = require('../../models');

router.post('/login', async (req, res) => {
  try {
    let userData 
    if(req.body.dropbox == 'band') {
      userData = await Bands.findOne({ where: { username: req.body.username } });
    } else if (req.body.dropbox == 'venue') {
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
    // creates a band account if the request is sent to the 1 (band) endpoint
    if (req.params.id == 1) {
      const bandData = await Bands.create({name: req.body.bandName, genre: req.body.bandGenre, username: req.body.bandUsername, password: req.body.bandPassword});
      
      req.session.save(() => {
        req.session.user_id = bandData.id;
        req.session.logged_in = true
        res.status(200).json(bandData)
      })

    // creates a venue account if the request is sent to the 2 (venue) endpoint
    } else if (req.params.id == 2) {
      const venueData = await Venues.create({name: req.body.venueName, username: req.body.venueUsername, password: req.body.venuePassword})

      req.session.save(() => {
        req.session.user_id = venueData.id;
        req.session.logged_in = true
        res.status(200).json(venueData)
      })
    }

  } catch (err) {
    res.status(400).json(err)
    console.log(err)
  }
})

module.exports = router;
