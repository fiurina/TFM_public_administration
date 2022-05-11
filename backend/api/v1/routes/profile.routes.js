module.exports = function (app, passport) {
    const profile = require('./../controllers/profile.controller');
    const config = require('./../../../config');

    app.route(config.base_enpoint+'/user')
      .get(passport.authenticateJwt, profile.getCitizenUser)
      .post(passport.authenticateJwt, profile.updateCitizenUser);
  
    app.route(config.base_enpoint+'/admin-user')
      .get(passport.authenticateJwt, profile.getAdminUser)
      .post(passport.authenticateJwt, profile.updateAdminUser);

};