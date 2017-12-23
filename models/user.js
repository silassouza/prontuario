
var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
var async = require('async')

var userSchema = new mongoose.Schema({
    nome: String,
    email: String,
    senha: String
})

userSchema.methods.comparePasswords = function(senha, callback){
    bcrypt.compare(senha, this.senha, callback)
}

var User = mongoose.model('User', userSchema)

User.createUser = function (user, callback) {
    async.waterfall([
        function genSalt(done) {
            bcrypt.genSalt(10, done)
        },
        function genHash(salt, done) {
            bcrypt.hash(user.senha, salt, done)
        },
        function saveUser(hash, done) {
            user.senha = hash
            user.save(callback)
            done(null)
        },
    ])
}

User.getUserByEmail = function(email, callback){
    var query = { email }
    User.findOne(query, callback)
}

module.exports = User