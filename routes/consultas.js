var express = require('express')

var Paciente = require('../models/paciente')

var router = express.Router()

// Register
router.get('/pacientes', function (req, res) {
    Paciente.find({}, 'nome', function(err, pacientes){
        res.render('pacientes', { pacientes })
    })
})

module.exports = router