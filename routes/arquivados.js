
var express = require('express')
const { check, validationResult } = require('express-validator/check');

var Paciente = require('../models/paciente')
var mapper = require('../mappers/paciente.map')
var mddl = require('../middlewares')

var router = express.Router()

router.get('/', function (req, res) {
    Paciente.listYears(req.user.email, function (err, years) {
        if (err) {
            return res.render('anos', { msg_error: err })
        }
        var state = { years };
        res.render('anos', state)
    })
})

router.get('/:year', function (req, res) {
    Paciente.findShelvedByYear(req.user.email, req.params.year, null, function (err, pacientes) {
        if (err) {
            return res.render('arquivo', { msg_error: err })
        }
        res.render('arquivo', { year: req.params.year, pacientes })
    })
})

router.get('/:year/json', function (req, res) {
    Paciente.findShelvedByYear(req.user.email, req.params.year, req.query.nome, function (err, pacientes) {
        if (err) {
            return res.status(500).json({ errorMessage: err })
        }
        res.json({ year: req.params.year, pacientes })
    })
})

router.post('/restaurar', [
    check('id').exists().withMessage('Dados inválidos'),
], function (req, res) {
    var errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(500)
            .json({ errorMessage: errors.array().map(e => e.msg) })
    }
    Paciente.restore(req.body.id, function (err, pacientes) {
        if (err) {
            return res.status(500).json({ errorMessage: err })
        }
        req.flash('successMessage', 'Paciente restaurado com sucesso')
        res.json({ redirectUrl: "/consultas/pacientes" })
    })
})

router.post('/excluir', [
    check('id').exists().withMessage('Dados inválidos'),
], function (req, res) {
    var errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(500)
            .json({ errorMessage: errors.array().map(e => e.msg) })
    }
    Paciente.delete(req.body.id, function (err, pacientes) {
        if (err) {
            return res.status(500).json({ errorMessage: err })
        }
        req.flash('successMessage', 'Paciente excluido com sucesso')
        res.json({ redirectUrl: "/consultas/pacientes" })
    })
})



module.exports = router