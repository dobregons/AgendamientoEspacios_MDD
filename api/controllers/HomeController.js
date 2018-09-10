module.exports = {
    home: function (req, res) {
        
        if (req.user) {
            return res.view("pages/home", { user: req.user });
        } else {
            return res.redirect('/');
        }
        
    }
};