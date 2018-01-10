var express = require('express')
var passport = require('passport')

var User = require('../models/user')

var router = express.Router()

// Register
router.get('/register', function (req, res) {
	res.render('register')
})

router.post('/register', function (req, res) {
	
	req.checkBody('nome', 'O campo Nome é obrigatório').notEmpty()
	req.checkBody('email', 'O campo Email é obrigatório').notEmpty()
	req.checkBody('email', 'O campo Email está inválido').isEmail()
	req.checkBody('senha', 'O campo Senha é obrigatório').notEmpty()
	req.checkBody('senha', 'As senhas não estão iguais').equals(req.body.senha2)

	var errors = req.validationErrors()

	if (errors) {
		res.render('register', { errors })
	} else {

		var newUser = new User(req.body)

		User.createUser(newUser, function (err, user) {
			if (err) {
				req.flash('error_msg', err.message)
			} else {
				req.flash('success_msg', 'Você está registrado e agora pode se logar')
			}
			res.redirect('/users/login')
		})
	}
})

// Login
router.get('/login', function (req, res) {
	res.render('login')
})

router.post('/login',
	passport.authenticate('local', {
		failureRedirect: '/users/login',
		failureFlash: true,
	}),
	function (req, res) {
		req.flash('success_msg', 'Você está logado')		
		res.redirect('/')
	}
)

router.get('/logout', function (req, res) {
	req.logout();
	req.flash('success_msg', 'Você está deslogado')
	res.redirect('/users/login')
})

module.exports = router