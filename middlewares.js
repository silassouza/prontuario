var moment = require('moment')

module.exports = {
    ensureAuth: function (req, res, next) {
        var ignore = [
            '/ping',
            '/users/login',
            '/users/logout',
            '/users/register'
        ]

        if (ignore.indexOf(req.path) > -1 || req.isAuthenticated()) {
            return next()
        } else {
            var url = '/users/login'
            req.flash('errorMessage', 'Você não está autenticado')
            if(req.xhr){
                return res.status(401).json({ redirectUrl: url })
            }
            res.redirect(url)
        }
    },

    setMessages: function (req, res, next) {
        res.locals.successMessage = req.flash('successMessage');
        res.locals.errorMessage = req.flash('errorMessage');
        res.locals.error = req.flash('error');
        res.locals.user = req.user || null;
        next();
    },

    custom: {
        isDate: function (value) {
            if (!value) return true;
            return moment(value, "DD/MM/YYYY").isValid()
        }
    },

    expressHandlebarsOptions: {
        defaultLayout: 'layout',
        extname: ".hbs",
        helpers: {
            selected: function (option, value) {
                if (option == value) {
                    return "selected"
                } else {
                    return null;
                }
            }
        }
    }
}