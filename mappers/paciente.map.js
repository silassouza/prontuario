var _ = require('underscore')
var moment = require('moment')

var base = require('./base.map')

var util = require('../models/util')
var estados = require('../models/enums/estados')
var estadosCivis = require('../models/enums/estadosCivis')
var respostas = require('../models/enums/respostas')
var religioes = require('../models/enums/religioes')
var sexos = require('../models/enums/sexos')
var parentescos = require('../models/enums/parentescos')

module.exports = {
    toJson: function (req) {
        var json = base.toJson(req.body)
        json.userEmail = req.user.email
        return json
    },

    toState: function (model) {
        var state = base.toState(model)
        state.numero = util.padLeft(state.numero)
        state.estados = estados.list()
        state.estadosCivis = estadosCivis.list()
        state.respostas = respostas.list()
        state.religioes = religioes.list()
        state.sexos = sexos.list()
        state.parentescos = parentescos.list()
        return state
    }


}