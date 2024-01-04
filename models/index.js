const Bands = require('./Bands');
const Venues = require('./Venues');
const Gigs = require('./Gigs');

Bands.hasMany(Gigs, {
  foreignKey: 'band_id'
});

Venues.hasMany(Gigs, {
  foreignKey: 'venue_id'
});

Gigs.hasOne(Bands, {
  foreignKey: 'id'
})

Gigs.hasOne(Venues, {
  foreignKey: 'id'
})

module.exports = { Bands, Gigs, Venues };
