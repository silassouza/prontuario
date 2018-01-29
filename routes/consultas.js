var express = require('express')
const { check, validationResult } = require('express-validator/check');

var Paciente = require('../models/paciente')
var mddl = require('../middlewares')

var router = express.Router()

// Register
router.get('/pacientes', function (req, res) {
    var query = { 
        userEmail: { $eq: req.user.email },
        dataArquivamento: { $exists: false }
    }

    Paciente.find(query, 'nome', function (err, pacientes) {
        if (err) {
            return res.render('pacientes', { msg_error: err })
        }
        res.render('pacientes', { pacientes })
    })
})

router.get('/pacientes/json/', function (req, res) {
    
    console.log(req.user.email)
    
    var query = { 
        userEmail: { $eq: req.user.email },
        dataArquivamento: { $exists: false }
    }
    
    if(req.query.nome)
        query.nome = { $regex: new RegExp('.*' + req.query.nome + '.*', 'i') }
    
    Paciente.find(query, 'nome', function (err, pacientes) {
        if (err) {
            res.status(500)
            return res.send(err)
        }
        res.json(pacientes)
    })
})

router.get('/evolucao/json', function (req, res) {
    Paciente.findById(req.query.id, 'evolucoes', function (err, pac) {
        if (err) {
            res.status(500)
            return res.send(err)
        }
        res.json(pac.evolucoes || [])
    })
})

router.post('/evolucao', [
    check('evolucoes').exists().withMessage('Dados inválidos'),
    check('evolucoes.*.data').not().isEmpty().withMessage('O campo Data é obrigatório'),
	check('evolucoes.*.data').custom(mddl.custom.isDate).withMessage('O campo Data é inválido'),
	check('evolucoes.*.descricao').not().isEmpty().withMessage('O campo Descrição é obrigatório')
],function (req, res) {
    
    var errors = validationResult(req)
    
    if (!errors.isEmpty()) {
		return res.status(500).json(errors.array().map(e => e.msg))
	}

    req.flash('success_msg', 'Paciente salvo com sucesso')
    res.end()
})

module.exports = router