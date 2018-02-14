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
            req.flash('errorMessage', 'Você não está autenticado')
            res.redirect('/users/login?ref=' + req.path)
        }
    },

    setMessages: function (req, res, next) {
        res.locals.successMessagee = req.flash('successMessagee');
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
    },

    // logErrors: function (err, req, res, next) {
    //     console.error(err)
    //     next(err)
    // },

    // clientErrorHandler: function (err, req, res, next) {
    //     if (req.xhr) {
    //         res.status(500).send({ error: process.env.NODE_ENV === 'prod' ? 'Something failed!' : err })
    //     } else {
    //         next(err)
    //     }
    // },

    // errorHandler: function (err, req, res, next) {
    //     res.status(500)
    //     res.render('error', { error: err })
    // }
}