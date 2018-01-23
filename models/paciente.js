var mongoose = require('mongoose')
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
    cpf: { type: String, unique: true },
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

schema.pre('save', function (next) {
    var obj = this
    counter.findByIdAndUpdate({ _id: 'Paciente' }, { $inc: { seq: 1 } },
        { new: true, upsert: true },
        function (error, counter) {
            if (error)
                return next(error)
            obj.numero = counter.seq
            next()
        })
})

schema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('cpf deve ser único'));
    } else {
        next(error);
    }
})

var Paciente = mongoose.model('Paciente', schema)

Paciente.nextCount = function(callback){
    counter.nextCount('Paciente', callback)
}

module.exports = Paciente




