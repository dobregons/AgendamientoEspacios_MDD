const passport = require('passport');

module.exports = {


  friendlyName: 'Forgotpassword',


  description: 'Forgotpassword auth.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    let req = this.req;
    let res = this.res;
    Persona.findOne({ email: req.param('email') }, function (err, user) {
      if ((err) || (!user)) {
        return res.send({ err });
      }
      var newPassword = Math.random()                        // Generate random number, eg: 0.123456
        .toString(36)           // Convert  to base-36 : "0.4fzyo82mvyr"
        .slice(-8);// Cut off last 8 characters : "yo82mvyr"
      var objEmail = new Object()
      objEmail.nombres = user.nombres;
      objEmail.email = user.email;
      objEmail.newPassword = newPassword;
      //Enviar correo de olvidar contraseña
      Mailer.enviarCorreoOlvidoContrasena(objEmail);
      //Cambiar contraseña
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newPassword, salt, null, function (err, hash) {
          if (err) return cb(err);
          //user.password = hash;
          Persona.update({ email: req.param('email') })
            .set({ password: hash });
          return exits.success();
        });
      });

      return exits.success();


    });

  }


};
