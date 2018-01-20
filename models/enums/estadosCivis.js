var HashMap = require('hashmap');
var util = require('../util');

var estadosCivis = module.exports = new HashMap()
    .set("SOL", "Solteiro")
    .set("CAS", "Casado")
    .set("VIU", "Viúvo")

estadosCivis.list = util.list.bind(estadosCivis)


