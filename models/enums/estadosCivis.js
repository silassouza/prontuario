var HashMap = require('hashmap');
var util = require('../util');

var hash = module.exports = new HashMap()
    .set("SOL", "Solteiro")
    .set("CAS", "Casado")
    .set("VIU", "Viúvo")

hash.list = util.list.bind(hash)


