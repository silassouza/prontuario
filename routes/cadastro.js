

var express = require('express')

var estados = require('../models/enums/estados').list()
var estadosCivis = require('../models/enums/estadosCivis').list()
var respostas = require('../models/enums/respostas').list()
var religioes = require('../models/enums/religioes').list()
var sexos = require('../models/enums/sexos').list()

var Paciente = require('../models/paciente');

var router = express.Router();

router.get('/adulto', function (req, res) {
	console.log(estados)
	
	res.render('adulto', {  
		index: 0,
		estados,
		estadosCivis,
		respostas,
		religioes,
		sexos	
	 });
});

router.post('/adulto', function (req, res) {

	req.body.estados = estados
	req.body.estadosCivis = estadosCivis
	req.body.respostas = respostas
	req.body.religioes = religioes
	req.body.sexos = sexos
	
	req.checkBody('nome', 'O campo Nome é obrigatório').notEmpty()
	req.checkBody('idade', 'O campo Idade é obrigatório').notEmpty()
	req.checkBody('dataNascimento', 'O campo Data de Nascimento é obrigatório').notEmpty()
	req.checkBody('sexo', 'O campo Sexo é obrigatório').notEmpty()
	req.checkBody('sexo', 'O campo Sexo é inválido').isIn(['M', 'F'])
	req.checkBody('naturalidade', 'O campo Naturalidade é obrigatório').notEmpty()
	req.checkBody('dataEntrada', 'O campo Data de enrtada é obrigatório').notEmpty()

	var errors = req.validationErrors()

	if (errors) {
		req.body.errors = errors	
		res.render('adulto', req.body)
	} else {

		var paciente = new Paciente(req.body)

		paciente.save(function (err, paciente) {
			if (err) {
				req.flash('error_msg', err.message)
			} else {
				req.flash('success_msg', 'Paciente cadastrado com sucesso')
			}
			res.render('adulto', req.body)
		})
	}


});

router.get('/crianca', function (req, res) {
	res.render('crianca');
});

module.exports = router;