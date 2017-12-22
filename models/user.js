
var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
var async = require('async')

var userSchema = new mongoose.Schema({
    nome: String,
    email: String,
    senha: String
})

var User = mongoose.model('User', userSchema)

// User.createUser = function(user, callback){
//     bcrypt.genSalt(10, function(err, salt){
//         bcrypt.hash(user.senha, salt, function(err, hash){
//             user.senha = hash
//             user.save(callback)
//         })
//     })
// }


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

User.getUserByUsername = function(username, callback){
    var query = { username: username }
    User.findOne(query, callback)
}

User.comparePasswords = function(password, hash, callback){
    bcrypt.compare(password, hash, callback)
}

module.exports = User