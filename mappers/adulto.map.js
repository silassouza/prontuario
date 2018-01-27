var _ = require('underscore')
var moment = require('moment')

var util = require('../models/util')
var estados = require('../models/enums/estados')
var estadosCivis = require('../models/enums/estadosCivis')
var respostas = require('../models/enums/respostas')
var religioes = require('../models/enums/religioes')
var sexos = require('../models/enums/sexos')

module.exports = {
    toJson: function (req) {
        var json = _.clone(req.body)

        _.each(json, function (value, key) {
            if (value === '') {
                delete json[key]
                return
            }
            if (key.startsWith('data')) {
                json[key] = moment(json[key], 'DD/MM/YYYY').valueOf()
            }
        })

        json.userEmail = req.user.email

        return json
    },

    toState: function (model) {
        var state = _.clone(model)

        state.estados = estados.list()
        state.estadosCivis = estadosCivis.list()
        state.respostas = respostas.list()
        state.religioes = religioes.list()
        state.sexos = sexos.list()

        _.each(state, function (value, key) {
            if (value && key.startsWith('data')) {
                state[key] = moment(state[key]).format('DD/MM/YYYY')
            }
        })

        state.numero = util.padLeft(state.numero)

        return state
    }


}