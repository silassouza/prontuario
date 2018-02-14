
var express = require('express')
const { check, validationResult } = require('express-validator/check');

var util = require('../models/util')
var Paciente = require('../models/paciente')
var mapper = require('../mappers/paciente.map')
var mddl = require('../middlewares')

var router = express.Router()

router.get('/adulto', function (req, res) {
	var model = {}
	Paciente.nextCount(function (err, count) {
		if (err) {
			return res.render('adulto', { msg_error: err })
		}
		var state = mapper.toState(model)
		state.numero = util.padLeft(count)
		res.render('adulto', state)
	})
})

router.get('/crianca', function (req, res) {
	var model = {}
	Paciente.nextCount(function (err, count) {
		if (err) {
			return res.render('crianca', { msg_error: err })
		}
		var state = mapper.toState(model)
		state.numero = util.padLeft(count)
		res.render('crianca', state)
	})
})

router.get('/paciente/:id', function (req, res) {
	Paciente.findById(req.params.id, function (err, model) {
		if (err || !model) {
			req.flash('error_msg', 'Paciente não encontrado')
			return res.redirect("/")
		}
		var state = mapper.toState(model)
		res.render(model.kind, state)
	})
})

router.post('/paciente', [
	check('nome').not().isEmpty().withMessage('O campo Nome é obrigatório'),
	check('dataNascimento').custom(mddl.custom.isDate).withMessage('O campo Data de Nascimento é inválido'),
	check('dataEntrada').custom(mddl.custom.isDate).withMessage('O campo Data de Entrada é inválido'),
	check('dataConsultaAnterior').custom(mddl.custom.isDate).withMessage('O campo Data de Consulta Anterior é inválido'),
], function (req, res) {

	var errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(500)
			.json(errors.array().map(e => e.msg))
	}

	var doc = mapper.toJson(req)

	Paciente.salvar(doc, function (err) {
		if (err) {
			return res.status(500).send(err.message)
		}
		req.flash('success_msg', 'Paciente salvo com sucesso')
		res.end()
	})
})

module.exports = router