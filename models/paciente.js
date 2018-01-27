var mongoose = require('mongoose')
var async = require('async')
var _ = require('underscore')

var counter = require('./counter')
var estados = require('./enums/estados').keys()
var estadosCivis = require('./enums/estadosCivis').keys()
var respostas = require('./enums/respostas').keys()
var religioes = require('./enums/religioes').keys()
var sexos = require('./enums/sexos').keys()

var schema = new mongoose.Schema({
    numero: { type: Number, unique: true, required: true },
    userEmail: { type: String, required: true },
    nome: { type: String, required: true },
    idade: { type: String },
    dataNascimento: { type: Date },
    sexo: { type: String, enum: sexos },
    naturalidade: { type: String },
    cpf: { type: String, trim: true, index: true, unique: true, sparse: true },
    profissao: { type: String },
    estadoCivil: { type: String, enum: estadosCivis },
    endereco: { type: String },
    cidade: { type: String },
    bairro: { type: String },
    estado: { type: String, enum: estados },
    cep: { type: String },
    foneResidencial: { type: String },
    foneTrabalho: { type: String },
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
    avaliacaoPrima: { type: String },
    dataArquivamento: { type: Date },
})

schema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('cpf deve ser único'));
    } else {
        next(error);
    }
})

var Paciente = mongoose.model('Paciente', schema)

Paciente.nextCount = function (callback) {
    counter.nextCount('Paciente', callback)
}

Paciente.updateCounter = function (doc, callback) {
    counter.updateCounter('Paciente', doc, callback)
}

Paciente.salvar = function (doc, callback){
    if (!doc._id){
        var model = new Paciente(doc)
		Paciente.updateCounter(model, function(err){
            if (err) return callback(err)
            model.save(callback)
		})
    } else {
        Paciente.findById(doc._id, function(err, model){
            if (!model) return callback({ message: 'Paciente não encontrado' })
            _.extend(model, doc)
            model.save(callback)
        })
    }
}

module.exports = Paciente




