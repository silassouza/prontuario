var HashMap = require('hashmap');

var estados = module.exports = new HashMap()
    .set("AC", "AC")
    .set("AL", "AL")
    .set("AP", "AP")
    .set("AM", "AM")
    .set("BA", "BA")
    .set("CE", "CE")
    .set("DF", "DF")
    .set("ES", "ES")
    .set("GO", "GO")
    .set("MA", "MA")
    .set("MT", "MT")
    .set("MS", "MS")
    .set("MG", "MG")
    .set("PA", "PA")
    .set("PB", "PB")
    .set("PR", "PR")
    .set("PE", "PE")
    .set("PI", "PI")
    .set("RJ", "RJ")
    .set("RN", "RN")
    .set("RS", "RS")
    .set("RO", "RO")
    .set("RR", "RR")
    .set("SC", "SC")
    .set("SP", "SP")
    .set("SE", "SE")
    .set("TO", "TO")
    
estados.list = function () {
    var list = []
    this.forEach(function (value, key) {
        list.push({ key, value })
    })
    return list
}