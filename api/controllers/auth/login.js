const passport = require('passport');

module.exports = {


  friendlyName: 'Login',


  description: 'Login auth.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    let req = this.req;
    let res = this.res;
    passport.authenticate('local', function (err, user, info) {
      if ((err) || (!user)) {
        return res.send({
          message: info.message,
          user
        });
      }
      req.logIn(user, function (err) {
        if (err)
          res.send(err);

        return res.redirect("/home");

        return res.send({
          message: info.message,
          user
        });
      });
    })(req, res);

  }


};
