const status = require("http-status");
const entity = require("../models/Quarto");
const EstadiaDAO = require("../DAO/EstadiaDAO");
const GenericDAO = require("../DAO/GenericDAO");
const UsuarioService = require("./UsuarioService");

const Role = require('../../helpers/enums/Role');

exports.findByPk = async (id) => {
    return EstadiaDAO.findByPk(id);
    
};
exports.findAll = async (abrigo_id, instituicao_id) => {
    if(abrigo_id && instituicao_id){
        return EstadiaDAO.findByAbrigoAndInsituicao(abrigo_id, instituicao_id)
    }else if(abrigo_id){
        return EstadiaDAO.findByAbrigo(abrigo_id);
    }else if(instituicao_id) {
        return EstadiaDAO.findByInsituicao(instituicao_id);
    }else{
        return EstadiaDAO.findAll();
    }
    
    
};