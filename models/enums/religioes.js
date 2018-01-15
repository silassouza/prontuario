var HashMap = require('hashmap');

var religioes = module.exports = new HashMap()
    .set("ADV", "Adventismo")
    .set("BAB", "Babaçuê")
    .set("BAH", "Bahá'í")
    .set("BAT", "Batuque")
    .set("BUD", "Budismo")
    .set("CAN", "Candomblé")
    .set("CAT", "Catolicismo")
    .set("ESP", "Espiritismo")
    .set("HIN", "Hinduísmo")
    .set("IOR", "Igreja Ortodoxa")
    .set("ISL", "Islamismo")
    .set("JUD", "Judaísmo")
    .set("MOR", "Mormonismo")
    .set("NRJ", "Não religiosos")
    .set("NPG", "Neopaganismo")
    .set("PRT", "Protestantismo")
    .set("SDA", "Santo Daime e religiões ameríndias")
    .set("TJV", "Testemunhas de Jeová")
    .set("UMB", "Umbanda")
    .set("XAM", "Xambá")

religioes.list = function () {
    var list = []
    this.forEach(function (value, key) {
        list.push({ key, value })
    })
    return list
}


