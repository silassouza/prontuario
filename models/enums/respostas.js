var HashMap = require('hashmap');
var  util = require('../util')

var hash = module.exports = new HashMap()
    .set("S", "SIM")
    .set("N", "NÃO")

hash.list = util.list.bind(hash)


