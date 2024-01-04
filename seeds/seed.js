const sequelize = require('../config/connection');
const { Bands, Venues, Gigs } = require('../models');

const eventData = require('./eventData.json')
const bandData = require('./bandData.json')
const venueData = require('./venueData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const bands = await Bands.bulkCreate(bandData, {
    individualHooks: true,
    returning: true,
  })
  
  const venues = await Venues.bulkCreate(venueData, {
    individualHooks: true,
    returning: true,
  })

  for (const event of eventData) {
    await Gigs.create({
      ...event
    });
  }

  process.exit(0);
};

seedDatabase();
