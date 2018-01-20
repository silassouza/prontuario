var HashMap = require('hashmap');
var  util = require('../util')

var respostas = module.exports = new HashMap()
    .set("S", "SIM")
    .set("N", "NÃO")

respostas.list = util.list.bind(respostas)


