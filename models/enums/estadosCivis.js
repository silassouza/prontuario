var HashMap = require('hashmap');

var estadosCivis = module.exports = new HashMap()
    .set("SOL", "Solteiro")
    .set("CAS", "Casado")
    .set("VIU", "Viúvo")

estadosCivis.list = function () {
    var list = []
    this.forEach(function (value, key) {
        list.push({ key, value })
    })
    return list
}



