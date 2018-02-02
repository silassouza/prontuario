var _ = require('underscore')
var moment = require('moment')

module.exports = {
    
    toJson: function (obj) {
        var json = _.clone(obj)
        _.each(json, function (value, key) {
            if (value === '') {
                delete json[key]
                return
            }
            if (key.startsWith('data')) {
                json[key] = moment(json[key], 'DD/MM/YYYY').valueOf()
            }
        })
        return json
    },

    toState: function (model) {
        var state = _.clone((model.toJSON && model.toJSON()) || model)
        _.each(state, function (value, key) {
            if (value && key.startsWith('data')) {
                state[key] = moment(state[key]).format('DD/MM/YYYY')
            }
        })
        return state
    }


}