module.exports = {
    list: function () {
        var list = []
        this.forEach(function (value, key) {
            list.push({ key, value })
        })
        return list
    }
}