
var express = require('express')

var Util = require('../models/util')
var Paciente = require('../models/paciente')
var mapper = require('../mappers/adulto.map')

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

router.post('/adulto', function (req, res) {

	req.checkBody('nome', 'O campo Nome é obrigatório').notEmpty()
	req.checkBody('dataNascimento', 'O campo Data de Nascimento é inválido').isDate()
	req.checkBody('dataEntrada', 'O campo Data de Entrada é inválido').isDate()
	req.checkBody('dataConsultaAnterior', 'O campo Data de Consulta Anterior é inválido').isDate()

	var errors = req.validationErrors()
	if (errors) {
		res.status(500)
		return res.send(errors.map(function (e) { return e.msg }))
	}

	var model = mapper.toModel(req)

	var handleSave = function (err, data){
		if (err) {
			res.status(500)
			return res.send(err.message)
		}
		req.flash('success_msg', 'Paciente cadastrado com sucesso')
		res.end()
	}

	if (!model._id){
		var paciente = new Paciente(model)
		Paciente.updateCounter(paciente, function(err){
			if (err) {
				res.status(500)
				return res.send(err.message)
			}
			paciente.save(handleSave)
		})
    } else {
        Paciente.findByIdAndUpdate(model._id, model, handleSave)
    }
})


router.get('/crianca', function (req, res) {
	res.render('crianca')
})

module.exports = router