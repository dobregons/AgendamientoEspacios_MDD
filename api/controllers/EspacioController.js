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

    }
};