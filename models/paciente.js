var mongoose = require('mongoose')
var async = require('async')
var _ = require('underscore')

var counter = require('./counter')
var estados = require('./enums/estados').keys()
var estadosCivis = require('./enums/estadosCivis').keys()
var respostas = require('./enums/respostas').keys()
var religioes = require('./enums/religioes').keys()
var sexos = require('./enums/sexos').keys()
var parentescos = require('./enums/parentescos').keys()

var options = { discriminatorKey: 'kind' }

var schema = new mongoose.Schema({
    kind: { type: String, required: true, enum: ['crianca', 'adulto'] },
    numero: { type: Number, unique: true, required: true },
    userEmail: { type: String, required: true },
    nome: { type: String, required: true },
    idade: { type: String },
    dataNascimento: { type: Date },
    sexo: { type: String, enum: sexos },
    naturalidade: { type: String },
    cpf: { type: String, trim: true, index: true, unique: true, sparse: true },
    endereco: { type: String },
    cidade: { type: String },
    bairro: { type: String },
    estado: { type: String, enum: estados },
    cep: { type: String },
    nomePai: { type: String },
    idadePai: { type: String },
    profissaoPai: { type: String },
    nomeMae: { type: String },
    idadeMae: { type: String },
    profissaoMae: { type: String },
    encaminhadoPor: { type: String },
    encaminhadoPara: { type: String },
    observacao: { type: String },
    dataEntrada: { type: Date },
    consultAnterior: { type: String, enum: respostas },
    dataConsultaAnterior: { type: Date },
    motivoProcura: { type: String },
    historicoQueixa: { type: String },
    religiao: { type: String, enumm: religioes },
    genetograma: { type: String },
    dinamicaFamiliar: { type: String },
    dinamicaSocial: { type: String },
    dinamicaEscolarProfissional: { type: String },
    historicoDoenca: { type: String, enum: respostas },
    historicoDoencaDetalhe: { type: String },
    avaliacaoPrimaria: { type: String },
    dataArquivamento: { type: Date },
    evolucoes: [{
        data: { type: Date, required: true },
        descricao: { type: String, required: true },
    }]
}, options)

schema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('cpf deve ser único'));
    } else {
        next(error);
    }
})

var Paciente = mongoose.model('Paciente', schema)

var Adulto = Paciente.discriminator('adulto', new mongoose.Schema({
    profissao: { type: String },
    estadoCivil: { type: String, enum: estadosCivis },
    foneResidencial: { type: String },
    foneTrabalho: { type: String },
}, options))

var Crianca = Paciente.discriminator('crianca', new mongoose.Schema({
    parentescoResponsavel: { type: String, enum: parentescos },
    nomeResponsavel: { type: String },
    telefoneResponsavel: { type: String },
    gestacao: { type: String },
    nascimento: { type: String },
    escolhaNome: { type: String },
    agressividade: { type: String },
    sono: { type: String },
    medos: { type: String },
    outrosAspectos: { type: String },
}, options))

Paciente.nextCount = function (callback) {
    counter.nextCount('Paciente', callback)
}

Paciente.updateCounter = function (doc, callback) {
    counter.updateCounter('Paciente', doc, callback)
}

Paciente.salvar = function (doc, callback) {
    if (!doc._id) {
        var model = {}
        switch (doc.kind) {
            case 'adulto':
                model = new Adulto(doc)
                break;
            case 'crianca':
                model = new Crianca(doc)
                break;
            default:
                return callback({ message: 'Tipo obrigatório' })
        }

        Paciente.updateCounter(model, function (err) {
            if (err) return callback(err)
            model.save(callback)
        })
    } else {
        Paciente.findById(doc._id, function (err, model) {
            if (!model) return callback({ message: 'Paciente não encontrado' })
            _.extend(model, doc)
            model.save(callback)
        })
    }
}

Paciente.arquivar = function (id, callback) {
    var dataArquivamento = Date.now()
    Paciente.findByIdAndUpdate(id, { $set: { dataArquivamento } }, function (err) {
        if (err) {
            return callback(err)
        }
        callback()
    })
}

Paciente.findByName = function (userEmail, name, callback) {
    var query = {
        userEmail: { $eq: userEmail },
        dataArquivamento: { $exists: false }
    }
    if (name)
        query.nome = { $regex: new RegExp('.*' + name + '.*', 'i') }
    Paciente.find(query, 'nome', { sort: { nome: 1 } }, function (err, list) {
        if (err) {
            return callback(err)
        }
        callback(null, list)
    })
}

Paciente.findEvolucoes = function(id, callback) {
    Paciente.findById(id, 'evolucoes', function (err, pac) {
        if (err) {
            return callback(err)
        }
        pac.evolucoes.sort(function (a, b) { return a.data - b.data })
        callback(null, pac.evolucoes)
    })
}

Paciente.salvarEvolucoes = function (id, evolucoes, callback) {
    Paciente.findByIdAndUpdate(id, { $set: { evolucoes } }, function (err) {
        if (err) {
            return callback(err)
        }
        callback()
    })
}

module.exports = Paciente




