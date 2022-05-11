const passportJWT = require("passport-jwt");
const { authenticate } = require("../api/v1/controllers/authentication.controller");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const config = require('./../config');

module.exports = function (passport) {

  /**
 * Strategy for passport to verify the user token
 */
  passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.generatorJWT,
    passReqToCallback: true
  }, async function (req, jwtPayload, done) {
    // console.log('Token JWT decoded: ', jwtPayload);
    let wallet = jwtPayload.tokenData.wallet;
    let [token, user] = await authenticate(wallet);
    if (user) { return done(null, { validated: true, wallet, user }); }
    return done(null, {validated: false});
  }));
  
  /**
 * Checks if the token is valid
 */
  passport.authenticateJwt = function (req, res, next) {
    // console.log('Passport jwt', req.headers.authorization)
    passport.authenticate('jwt', function (err, tokenData) {
      // console.log('Validated JWT passport', tokenData);
      // console.log('Error jwt passport', err);
      if (err!==null) { return res.status(401).send({ message: 'Usuario no autenticado' }); }
      req.wallet = tokenData.wallet;
      req.roles = tokenData.roles;
      return next();
    })(req, res, next);
  };

};