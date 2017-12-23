var passport = require('passport')
var passaportLocal = require('passport-local')
var User = require('../models/user')

var localStrategy = new passaportLocal.Strategy(
	{
		usernameField: 'email',
		passwordField: 'senha'
	},
	function (email, senha, done) {
		User.getUserByEmail(email, function (err, user) {
			if (err) { return done(err); }
			if (!user) {
				return done(null, false, { message: 'Email não cadastrado' });
				console.log('Incorrect username.')
			}
			user.comparePasswords(senha, function(err, isMatch){
				if (err) { return done(err); }
				if(!isMatch){
					return done(null, false, { message: 'Senha incorreta' });
					console.log('Incorrect password.')
				}else{
					return done(null, user);
					console.log('loged ' + user)
				}
			})
		});
	}
)

console.log('using localStrategy')
passport.use(localStrategy)

passport.serializeUser(function (user, done) {
	console.log('serializeUser')
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	console.log('deserializeUser')
	User.findById(id, function (err, user) {
		done(err, user);
	});
});

