var _ = require('underscore')
var moment = require('moment')

var estados = require('../models/enums/estados')
var estadosCivis = require('../models/enums/estadosCivis')
var respostas = require('../models/enums/respostas')
var religioes = require('../models/enums/religioes')
var sexos = require('../models/enums/sexos')

module.exports = {
    toModel: function (req) {
        var model = _.clone(req.body)

        _.each(model, function (value, key) {
            if (value === '') {
                delete model[key]
                return
            }
            if (key.startsWith('data')) {
                model[key] = moment(model[key], 'DD/MM/YYYY').valueOf()
            }
        })

        model.userEmail = req.user.email

        return model
    },

    toState: function (state) {
        var state = _.clone(state)

        state.estados = estados.list()
        state.estadosCivis = estadosCivis.list()
        state.respostas = respostas.list()
        state.religioes = religioes.list()
        state.sexos = sexos.list()

        _.each(state, function (value, key) {
            if (!value) {
                return
            }
            if (key.startsWith('data')) {
                state[key] = moment(state[key]).format('DD/MM/YYYY')
            }
        })

        return state
    }


}