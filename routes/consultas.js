var express = require('express')
const { check, validationResult } = require('express-validator/check');

var baseMap = require('../mappers/base.map')
var Paciente = require('../models/paciente')
var mddl = require('../middlewares')

var router = express.Router()

// Register
router.get('/pacientes', function (req, res) {
    Paciente.findByName(req.user.email, null, function (err, pacientes) {
        if (err) {
            return res.render('consulta', { msg_error: err })
        }
        res.render('consulta', { pacientes })
    })
})

router.get('/pacientes/json/', function (req, res) {
    Paciente.findByName(req.user.email, req.query.nome, function (err, pacientes) {
        if (err) {
            res.status(500)
            return res.json(err)
        }
        res.json(pacientes)
    })
})

router.get('/evolucao/json', function (req, res) {
    Paciente.findById(req.query.id, 'evolucoes', function (err, pac) {
        if (err) {
            res.status(500)
            return res.json(err)
        }
        var evolucoes = (pac.evolucoes || []).map(baseMap.toState)
        res.json(evolucoes)
    })
})

router.post('/evolucao', [
    check('evolucoes').exists().withMessage('Dados inválidos'),
    check('evolucoes.*.data').not().isEmpty().withMessage('O campo Data é obrigatório'),
    check('evolucoes.*.data').custom(mddl.custom.isDate).withMessage('O campo Data é inválido'),
    check('evolucoes.*.descricao').not().isEmpty().withMessage('O campo Descrição é obrigatório')
], function (req, res) {

    var errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(500)
            .json(errors.array().map(e => e.msg))
    }

    var evolucoes = req.body.evolucoes.map(baseMap.toJson)

    Paciente.findByIdAndUpdate(req.body.id, { evolucoes }, function (err) {
        if (err) {
            return res.status(500).json(err)
        }
        req.flash('success_msg', 'Paciente salvo com sucesso')
        res.end()
    })
})

module.exports = router