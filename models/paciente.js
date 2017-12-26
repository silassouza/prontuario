var mongoose = require('mongoose')

var estados = require('./enums/estados').keys()
var estadosCivis = require('./enums/estadosCivis').keys()
var respostas = require('./enums/respostas').keys()
var religioes = require('./enums/religioes').keys()
var sexos = require('./enums/sexos').keys()

var userSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    nome: { type: String, required: true },
    idade: { type: String, required: true },
    dataNascimento: { type: Date, required: true },
    sexo: { type: String, enum: sexos, required: true },
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
    avaliacaoPrima: { type: String }
})

var Paciente = mongoose.model('Paciente', userSchema)

module.exports = Paciente




