module.exports = {
    reserva: function (req, res) {
        if (req.user) {
            
            return res.view("pages/reserva", { user: req.user });
        } else {
            return res.redirect('/');
        }
        
    }
};