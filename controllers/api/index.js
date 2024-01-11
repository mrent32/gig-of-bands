const router = require('express').Router();
const userRoutes = require('./userRoutes');
const performerRoutes = require('./performerRoutes');
const venueRoutes = require('./venueRoutes');

router.use('/users', userRoutes);
router.use('/performers', performerRoutes);
router.use('/venues', venueRoutes);

module.exports = router;
