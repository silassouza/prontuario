
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

function clean(obj) {
	for (var propName in obj) { 
	  if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
		delete obj[propName];
	  }
	}
  }

router.get('/adulto', function (req, res) {
	var state = { index: 0 }
	fillLists(state)
	res.render('adulto', state)
})

router.post('/adulto', function (req, res) {

	var state = req.body;
	state.userEmail = req.user.email;
	fillLists(state)
	clean(state)
	
	req.checkBody('nome', 'O campo Nome é obrigatório').notEmpty()	
	req.checkBody('dataNascimento', 'O campo Data de Nascimento é obrigatório').notEmpty()
	req.checkBody('dataEntrada', 'O campo Data de entrada é obrigatório').notEmpty()
	
	var errors = req.validationErrors()
	if (errors) {
		req.getValidationResult().throw();
	} 

	var paciente = new Paciente(state)

	paciente.save(function (err, paciente) {
		if (err) {
			state.errors = [];
			state.errors.push(err);
			res.render('adulto', state)
		} else {
			req.flash('success_msg', 'Paciente cadastrado com sucesso')
			res.render('adulto', state)
		}
		
	})
})

router.get('/crianca', function (req, res) {
	res.render('crianca')
})

module.exports = router