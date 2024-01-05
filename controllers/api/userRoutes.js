const router = require('express').Router();
const { Bands } = require('../../models');
const { Venues } = require('../../models')

router.post('/', async (req, res) => {
  try {
    const bandData = await Bands.create({username: req.body.name, password: req.body.password});
    // const venueData = await Venues.create(req.body);
    req.session.save(() => {
      req.session.user_id = bandData.id;
      req.session.logged_in = true;

      res.status(200).json(bandData);
    });
  } catch (err) {
    console.log('logging out', err)
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await Bands.findOne({ where: { email: req.body.email } });

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
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
