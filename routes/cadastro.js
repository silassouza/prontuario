
var express = require('express')
const { check, validationResult } = require('express-validator/check');

var Util = require('../models/util')
var Paciente = require('../models/paciente')
var mapper = require('../mappers/adulto.map')
var mddl = require('../middlewares')

var router = express.Router()

router.get('/adulto/:id', function (req, res) {
	Paciente.findById(req.params.id, function (err, model) {
		if (err || !model) {
			req.flash('error_msg', 'Paciente não encontrado')
			return res.redirect("/")
		}
		var state = mapper.toState(model)
		res.render('adulto', state)
	})
})

router.get('/adulto', function (req, res) {
	var model = {}
	Paciente.nextCount(function (err, count) {
		if (err) {
			return res.render('adulto', { msg_error: err })
		}
		var state = mapper.toState(model)
		state.numero = Util.padLeft(count)
		res.render('adulto', state)
	})
})

router.post('/adulto',[
	check('nome').not().isEmpty().withMessage('O campo Nome é obrigatório'),
	check('dataNascimento').custom(mddl.custom.isDate).withMessage('O campo Data de Nascimento é inválido'),
	check('dataEntrada').custom(mddl.custom.isDate).withMessage('O campo Data de Entrada é inválido'),
	check('dataConsultaAnterior').custom(mddl.custom.isDate).withMessage('O campo Data de Consulta Anterior é inválido'),
], function (req, res) {

	var errors = req.validationErrors()
	if (errors) {
		res.status(500)
		return res.send(errors.map(function (e) { return e.msg }))
	}
	
	var doc = mapper.toJson(req)

	Paciente.salvar(doc, function(err){
		if (err) {
			res.status(500)
			return res.send(err.message)
		}
		req.flash('success_msg', 'Paciente salvo com sucesso')
		res.end()
	})
})


router.get('/crianca', function (req, res) {
	res.render('crianca')
})

module.exports = router