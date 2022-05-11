module.exports = function (app, passport) {
    const Anthentication = require('./../controllers/authentication.controller');
    const config = require('./../../../config');
  
    app.route(config.base_enpoint+'/wallets')
      .get(Anthentication.getAccountsLocal)

    app.route(config.base_enpoint+'/authenticate-user')
      .post(Anthentication.authenticateUser)

    app.route(config.base_enpoint+'/users/admin')
      .get(passport.authenticateJwt, Anthentication.getTotalAdminUsersCall)
      .post(Anthentication.registerAdminUserCall)
      .delete(passport.authenticateJwt, Anthentication.deleteAdminUserCall)
  
    app.route(config.base_enpoint+'/users/user')
      .get(passport.authenticateJwt, Anthentication.getTotalUsersCall)
      .post(Anthentication.registerUserCall)
      .delete(passport.authenticateJwt, Anthentication.deleteUserCall)

    app.route(config.base_enpoint+'/users/logout')
    .post(Anthentication.logoutUser)

};