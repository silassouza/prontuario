

var express = require('express')

var estados = require('../models/enums/estados')
var estadosCivis = require('../models/enums/estadosCivis')
var respostas = require('../models/enums/respostas')
var religioes = require('../models/enums/religioes')
var sexos = require('../models/enums/sexos')

var Paciente = require('../models/paciente')

var router = express.Router()

function fillLists(state){
	state.estados = estados.list()
	state.estadosCivis = estadosCivis.list()
	state.respostas = respostas.list()
	state.religioes = religioes.list()
	state.sexos = sexos.list()
}

router.get('/adulto', function (req, res) {
	var state = { index: 0 }
	fillLists(state)
	res.render('adulto', state)
})

router.post('/adulto', function (req, res) {

	var state = req.body;
	
	fillLists(state)
	
	req.checkBody('nome', 'O campo Nome é obrigatório').notEmpty()
	req.checkBody('idade', 'O campo Idade é obrigatório').notEmpty()
	req.checkBody('dataNascimento', 'O campo Data de Nascimento é obrigatório').notEmpty()
	req.checkBody('sexo', 'O campo Sexo é obrigatório').notEmpty()
	req.checkBody('sexo', 'O campo Sexo é inválido').isIn(sexos.keys())
	req.checkBody('naturalidade', 'O campo Naturalidade é obrigatório').notEmpty()
	req.checkBody('dataEntrada', 'O campo Data de entrada é obrigatório').notEmpty()
	req.checkBody('dataEntrada', 'O campo Data de entrada é inválido').isDate()

	var errors = req.validationErrors()
	if (errors) {
		state.errors = errors	
		return res.render('adulto', state)
	} 

	var paciente = new Paciente(state)

	paciente.save(function (err, paciente) {
		if (err) {
			req.flash('error_msg', err.message)
		} else {
			req.flash('success_msg', 'Paciente cadastrado com sucesso')
		}
		res.render('adulto', state)
	})
})

router.get('/crianca', function (req, res) {
	res.render('crianca')
})

module.exports = router