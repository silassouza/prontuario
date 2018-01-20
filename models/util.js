module.exports = {
    list: function () {
        var list = []
        this.forEach(function (value, key) {
            list.push({ key, value })
        })
        return list
    },
    padLeft: function(value, pad = "0000"){
        var str = "" + value
        return pad.substring(0, pad.length - str.length) + str
    }
}