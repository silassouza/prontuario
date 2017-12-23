var expressValidator = require('express-validator');

module.exports = {
    ensureAuth: function (req, res, next) {
        var ignore = [
            '/users/login',
            '/users/logout',
            '/users/register'
        ]
        console.log("path " + req.path + (ignore.indexOf(req.path) > -1  ? " ignored" : " restricted"))
        console.log(req.isAuthenticated() ? "is Authenticated" : "isn't Authenticated")

        if (ignore.indexOf(req.path) > -1 || req.isAuthenticated()) {
            console.log("can access " + req.path)
            return next()
        } else {
            console.log("can't access" + req.path)
            req.flash('error_msg', 'Você não está autenticado')
            res.redirect('/users/login?ref=' + req.path)
        }
    },

    setMessages: function (req, res, next) {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        res.locals.user = req.user || null;
        next();
    },

    expressValidator: expressValidator({
        errorFormatter: function (param, msg, value) {
            var namespace = param.split('.')
                , root = namespace.shift()
                , formParam = root;

            while (namespace.length) {
                formParam += '[' + namespace.shift() + ']';
            }
            return {
                param: formParam,
                msg: msg,
                value: value
            };
        }
    }),

}