var HashMap = require('hashmap');
var  util = require('../util')

var hash = module.exports = new HashMap()
    .set("M", "M")
    .set("F", "F")

hash.list = util.list.bind(hash)
