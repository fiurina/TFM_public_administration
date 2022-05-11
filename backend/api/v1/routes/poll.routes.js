module.exports = function (app, passport) {
    const Poll = require('./../controllers/poll.controller');
    const config = require('./../../../config');
    
    app.route(config.base_enpoint+'/poll')
    .get(passport.authenticateJwt, Poll.getPollByIdCall)
    .post(passport.authenticateJwt, Poll.createPollCall)
    .delete(passport.authenticateJwt, Poll.deletePoll)

    app.route(config.base_enpoint+'/polls')
    .get(passport.authenticateJwt, Poll.getAllPollsCall)

    app.route(config.base_enpoint+'/total-polls')
    .get(passport.authenticateJwt, Poll.getTotalPollsCall)

    app.route(config.base_enpoint+'/poll/results')
    .get(passport.authenticateJwt, Poll.getPollResultsCall);

    app.route(config.base_enpoint+'/poll/answer')
    .post(passport.authenticateJwt, Poll.answerPollCall);
  
};