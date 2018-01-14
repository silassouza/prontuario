
var express = require('express')

var estados = require('../models/enums/estados')
var estadosCivis = require('../models/enums/estadosCivis')
var respostas = require('../models/enums/respostas')
var religioes = require('../models/enums/religioes')
var sexos = require('../models/enums/sexos')

var Paciente = require('../models/paciente')
var mapper = require('../mappers/adulto.map')

var router = express.Router()

router.get('/adulto', function (req, res) {

	var model = {}

	model.estados = estados.list()
	model.estadosCivis = estadosCivis.list()
	model.respostas = respostas.list()
	model.religioes = religioes.list()
	model.sexos = sexos.list()

	res.render('adulto', model)
})

router.post('/adulto', function (req, res) {

	req.checkBody('nome', 'O campo Nome é obrigatório').notEmpty()
	req.checkBody('dataNascimento', 'O campo Data de Nascimento é inválido').isDate()
	req.checkBody('dataEntrada', 'O campo Data de Entrada é inválido').isDate()
	req.checkBody('dataConsultaAnterior', 'O campo Data de Consulta Anterior é inválido').isDate()
	
	var errors = req.validationErrors()
	if (errors) {
		res.status(500)
		return res.send(errors.map(function(e){ return e.msg }))
	} 

	var model = mapper.map(req)

	var paciente = new Paciente(model)

	paciente.save(function (err, paciente) {
		if (err) {
			res.status(500)
			return res.send(err)
		}

		req.flash('success_msg', 'Paciente cadastrado com sucesso')
		res.end()
	})
})

router.get('/crianca', function (req, res) {
	res.render('crianca')
})

module.exports = router