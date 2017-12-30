var passport = require('passport')
var passaportLocal = require('passport-local')
var User = require('../models/user')

var localStrategy = new passaportLocal.Strategy(
	{
		usernameField: 'email',
		passwordField: 'senha'
	},
	function (email, senha, verify) {

		User.getUserByEmail(email, function (err, user) {
			if (err) { verify(err); }
			if (!user) {
				verify(null, false, { message: 'Email não cadastrado' });
				return;
			}
			user.comparePasswords(senha, function (err, isMatch) {
				if (err) { verify(err); }
				if (!isMatch) {
					verify(null, false, { message: 'Senha incorreta' });
					return;
				}
				verify(null, user);
			})
		});
	}
)

passport.use(localStrategy)

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});

