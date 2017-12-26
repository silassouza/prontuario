var HashMap = require('hashmap');

var sexos = module.exports = new HashMap()
    .set("M", "M")
    .set("F", "F")

sexos.list = function () {
    var list = []
    this.forEach(function (value, key) {
        list.push({ key, value })
    })
    return list
}



