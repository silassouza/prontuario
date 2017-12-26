var HashMap = require('hashmap');

var respostas = module.exports = new HashMap()
    .set("S", "SIM")
    .set("N", "NÃO")

respostas.list = function () {
    var list = []
    this.forEach(function (value, key) {
        list.push({ key, value })
    })
    return list
}



