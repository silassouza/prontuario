var mongoose = require('mongoose')
var autoIncrement = require('mongoose-auto-increment-fix')

var estados = require('./enums/estados').keys()
var estadosCivis = require('./enums/estadosCivis').keys()
var respostas = require('./enums/respostas').keys()
var religioes = require('./enums/religioes').keys()
var sexos = require('./enums/sexos').keys()
var util = require('./util')

autoIncrement.initialize(mongoose.connection)
var schema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    _numero: { type: Number, required: true },
    nome: { type: String, required: true },
    idade: { type: String },
    dataNascimento: { type: Date },
    sexo: { type: String, enum: sexos },
    naturalidade: { type: String },
    cpf: { type: String },
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

schema.plugin(autoIncrement.plugin,  { model: 'Paciente',  field: '_numero', startAt: 1 });

schema.virtual('numero').get(function(){
    return util.padLeft(this._numero)
})

var Paciente = mongoose.model('Paciente', schema)

module.exports = Paciente




