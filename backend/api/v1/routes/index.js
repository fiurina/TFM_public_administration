
module.exports = function (app, passport) {
  require('./authentication.routes')(app, passport);
  require('./poll.routes')(app, passport);
  require('./profile.routes')(app, passport);
  require('./social-aid.routes')(app, passport);
  require('./contract-balance.routes')(app, passport);
  require('./ipfs.routes')(app, passport);
};