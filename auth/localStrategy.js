var passport = require('passport')
var passaportLocal = require('passport-local')
var async = require('async')
var User = require('../models/user')

var localStrategy = new passaportLocal.Strategy(
	{
		usernameField: 'email',
		passwordField: 'senha'
	},
	function (email, senha, verify) {

		// async.waterfall([
		// 	function getUser(next) {
		// 		User.getUserByEmail(email, next)
		// 	},
		// 	function checkPass(user, next){
		// 		if (!user) {
		// 			verify(null, false, { message: 'Email não cadastrado' });
		// 			console.log('Incorrect username.')
		// 		}
		// 		user.comparePasswords(senha, next) 
		// 	},
		// 	function verifyAccess(isMatch, user, done){
		// 		debugger;
		// 		if(!isMatch){
		// 			verify(null, false, { message: 'Senha incorreta' });
		// 			console.log('Incorrect password.')
		// 		}else{
		// 			verify(null, user);
		// 			console.log('loged ' + user)
		// 		}
		// 		done(null)
		// 	}
		// ], verify)

		User.getUserByEmail(email, function (err, user) {
			if (err) { verify(err); }
			if (!user) {
				verify(null, false, { message: 'Email não cadastrado' });
				console.log('Incorrect username.')
				return;
			}
			user.comparePasswords(senha, function (err, isMatch) {
				if (err) { verify(err); }
				if (!isMatch) {
					verify(null, false, { message: 'Senha incorreta' });
					console.log('Incorrect password.')
					return;
				}
				verify(null, user);
				console.log('loged ' + user)
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

