module.exports = {
    selected: function (option, value) {
        if (option == value) {
            return "selected"
        } else {
            return null;
        }
    }
}