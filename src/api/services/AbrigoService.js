const GenericDAO = require('../DAO/GenericDAO');
const AbrigosDAO = require('../DAO/AbrigoDAO');
const entity = require("../models/Abrigo");
const UsuarioService = require("../services/UsuarioService");
const Role = require('../../helpers/enums/Role');

exports.create = async (model, object) => {  
    return GenericDAO.create(model,object);
    
};

exports.solicitarMembro = async(usuario_id, abrigo_id) =>{
    try {
		usuario =  await UsuarioService.findByPk(usuario_id);
        if(usuario.role == Role.NOTHING && usuario.abrigo_id == null && usuario.instituicao_id == null){
            abrigo = await AbrigosDAO.findByPk(abrigo_id);
            if(abrigo == null){
                throw new Error("Abrigo não existe");
            }
            usuario.abrigo_id = abrigo.id;

            result  = await UsuarioService.setAbrigo(usuario.id, abrigo.id);
            return result;
        }else{
            throw error;
        }
            
        
	} catch (error) {
        console.log(error)
		throw error;
	}
    
    
}


exports.findAbrigosNaoAprovados = async() =>{
    return AbrigosDAO.findAbrigosNaoAprovados();
}
exports.findAbrigosAprovados = async() =>{
    return AbrigosDAO.findAbrigosAprovados();
}

exports.aprovarCriacao = async (id) => {  
    try {
		abrigo = await GenericDAO.findByPk(entity, id);

		return await AbrigosDAO.aprovar(id, !abrigo.aprovado);
		
	} catch (error) {
		throw error;
	}
    
};

exports.update = async (model, object, id) => {
    return GenericDAO.update(model,object,id);
    
};

exports.delete = async (model, id) => {
    return GenericDAO.destroy(model,id);
    
};

exports.findByPk = async (id) => {
    return AbrigosDAO.findByPk(id);
    
};

exports.findAll = async (model) => {
    return GenericDAO.findAll(model);
    
};

exports.delete = async (model) => {
    return GenericDAO.delete(model, id);
}

exports.findAllWithPagination = async (model, limit, page) => {
    return GenericDAO.findAllWithPagination(model,limit, page);
     
};
exports.verifyIfExistsById = async (model, id) => {
    return model.findByPk(model,id);
};
