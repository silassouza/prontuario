var _ = require('underscore')
var  moment = require('moment')

module.exports = {
    map: function(req){
        var model = _.clone(req.body)

        _.each(model, function(v, k) {
            if(v === '') {
              delete model[k]
              return
            }
            if(k.startsWith('data')) {
                model[k] = moment(model[k], 'DD/MM/YYYY').valueOf()
            }
        })

        model.userEmail = req.user.email
        model.arquivado = false

        return model
    }
}