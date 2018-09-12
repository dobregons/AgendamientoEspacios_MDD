const passport = require('passport');

module.exports = {
    login: function (req, res) {

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
    },
    logout: function (req, res) {
        req.logout();
        res.redirect('/');
    },
    forgotpassword: function (req, res) {
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

            //res.json(200, { correo: correo });
            return exits.success();


        });
    }
};