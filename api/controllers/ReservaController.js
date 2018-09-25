module.exports = {
    reserva: function (req, res) {
        // var espacios = Espacio.find({}, function (err, espacios) {
        //     return res.view("pages/reserva", {
        //    //      user: req.user,
        //         espacios: espacios
        //     });
        // });
        if (req.user) {
            var espacios = Espacio.find({}, function (err, espacios) {
                return res.view("pages/reserva/reserva", {
                     user: req.user,
                    espacios: espacios
                });
            });
        } else {
            return res.redirect('/');
        }

    }
};