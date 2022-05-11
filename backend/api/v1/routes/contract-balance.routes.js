module.exports = function (app, passport) {
    const ContractBalance = require('./../controllers/contract-balance.controller');
    const config = require('./../../../config');
  
    app.route(config.base_enpoint+'/contract')
      .get(passport.authenticateJwt, ContractBalance.getContractBalance)
      .post(passport.authenticateJwt, ContractBalance.addTokensToContract)

};