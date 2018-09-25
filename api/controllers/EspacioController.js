module.exports = {
    crearespacio: function (req, res) {
        if (req.user) {
            var tiposespacio = Tipoespacio.find({}, function (err, tiposespacio) {
                //data.lists = categories;
                //res.view("pages/home",data); 
                return res.view("pages/espacio/crearespacio", {
                    user: req.user,
                    tiposespacio: tiposespacio
                });
            });
        } else {
            return res.redirect('/');
        }

    },
    modificarespacio: async function (req, res) {
        //if (req.user) {
        var _espacio = await Espacio.findOne({ id: req.param('idespacio') }, function (err, espacio) {
            if ((err) || (!espacio)) {
                return res.send({ err });
            }
            var tiposespacio = Tipoespacio.find({}, function (err, tiposespacio) {
                return res.view("pages/espacio/modificarespacio", {
                    user: req.user,
                    tiposespacio: tiposespacio,
                    espacio: espacio
                });
            });
        }
        );
        // if(_espacio.length > 0 ){
        //     var tiposespacio = Tipoespacio.find({},function(err,tiposespacio){ 
        //         return res.view("pages/modificarespacio", {
        //             user: req.user,
        //             tiposespacio: tiposespacio,
        //             espacio:_espacio
        //         }); 
        //     });
        // }
        // else {
        //   return res.redirect('/');
        // }

    },
    administrarespacios: function (req, res) {
        if (req.user) {
            var espacios = Espacio.find({}, function (err, espacios) {
                return res.view("pages/espacio/administrarespacio", {
                    user: req.user,
                    espacios: espacios
                });
            });
        } else {
            return res.redirect('/');
        }

    }
};