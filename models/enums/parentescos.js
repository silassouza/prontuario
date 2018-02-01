var HashMap = require('hashmap');
var  util = require('../util')

var hash = module.exports = new HashMap()
    .set("PAI", "PAI")
    .set("MAE", "MÃE")
    .set("AVH", "AVÔ")
    .set("AVO", "AVÓ")
    .set("TIO", "TIO")
    .set("TIA", "TIA")
    .set("IMO", "IRMÃO")
    .set("IMA", "IRMÃ")

hash.list = util.list.bind(hash)
