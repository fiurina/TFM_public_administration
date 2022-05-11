module.exports = function (app, passport) {
    const socialAid = require('./../controllers/social-aid.controller');
    const config = require('./../../../config');

    app.route(config.base_enpoint+'/social')
    .get(passport.authenticateJwt, socialAid.getSocialAidByIdCall)
    .post(passport.authenticateJwt, socialAid.createSocialAid)
    .delete(passport.authenticateJwt, socialAid.deleteSocial)

    app.route(config.base_enpoint+'/socials')
    .get(passport.authenticateJwt, socialAid.getAllSocialAidsCall)

    app.route(config.base_enpoint+'/total-socials')
    .get(passport.authenticateJwt, socialAid.getTotalSocialAidsCall)

    app.route(config.base_enpoint+'/social/check')
    .post(passport.authenticateJwt, socialAid.checkSocialAidCall);

    app.route(config.base_enpoint+'/social/recieve')
    .post(passport.authenticateJwt, socialAid.recieveSocialAidCall);

};