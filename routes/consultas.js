var express = require('express')

var Paciente = require('../models/paciente')

var router = express.Router()

// Register
router.get('/pacientes', function (req, res) {

    Paciente.find({}, 'nome', function (err, pacientes) {
        if (err) {
            return res.render('pacientes', { msg_error: err })
        }
        res.render('pacientes', { pacientes })
    })
})

router.get('/pacientes/json', function (req, res) {
    var query = {}
    
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

module.exports = router