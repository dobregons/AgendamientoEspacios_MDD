module.exports = {
    crearespacio: function (req, res) {
        if (req.user) {
            var tiposespacio = Tipoespacio.find({},function(err,tiposespacio){
                    //data.lists = categories;
                //res.view("pages/home",data); 
                return res.view("pages/crearespacio", {
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
        var _espacio = await Espacio.find({id : req.query.idespacio});
        if(_espacio.length > 0 ){
            var tiposespacio = Tipoespacio.find({},function(err,tiposespacio){ 
                return res.view("pages/modificarespacio", {
                    user: req.user,
                    tiposespacio: tiposespacio,
                    espacio:_espacio[0]
                }); 
            });
        }
        else {
          return res.redirect('/');
        }

    }
};