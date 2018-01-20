var HashMap = require('hashmap');
var  util = require('../util')

var sexos = module.exports = new HashMap()
    .set("M", "M")
    .set("F", "F")

sexos.list = util.list.bind(sexos)
