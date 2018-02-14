var express = require('express')
var passport = require('passport')

var User = require('../models/user')
const { check, validationResult } = require('express-validator/check');

var router = express.Router()

// Register
router.get('/register', function (req, res) {
	res.render('register')
})

router.post('/register', [
	check('nome').not().isEmpty().withMessage('O campo Nome é obrigatório'),
	check('email').not().isEmpty().withMessage('O campo Email é obrigatório'),
	check('email').isEmail().withMessage('O campo Email está inválido'),
	check('senha').not().isEmpty().withMessage('O campo Senha é obrigatório'),
	check('senha').isLength({ min: 4 }).withMessage('O campo Senha deve ter no mínimo 4 caracteres'),
	check('senha').custom((value, { req }) => value === req.body.senha).withMessage('As senhas não estão iguais'),
], function (req, res) {

	var errors = validationResult(req)

	if (!errors.isEmpty()) {
		res.render('register', { errors: errors.array() })
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