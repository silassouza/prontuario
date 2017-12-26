
var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
var async = require('async')

var userSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    senha: { type: String, required: true },
})

userSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('email deve ser único'));
    } else {
        next(error);
    }
})

userSchema.methods.comparePasswords = function (senha, callback) {
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

User.getUserByEmail = function (email, callback) {
    var query = { email }
    User.findOne(query, callback)
}

module.exports = User