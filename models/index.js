const Bands = require('./Bands');
const Venues = require('./Venues');
const Gigs = require('./Gigs');

Bands.hasMany(Gigs, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Gigs.belongsTo(Bands, {
  foreignKey: 'user_id'
});

module.exports = { Bands, Gigs, Venues };
