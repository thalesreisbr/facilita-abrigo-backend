const GenericDAO = require('../DAO/GenericDAO');
const InstituicaoDAO = require('../DAO/InstituicaoDAO');
const entity = require("../models/Instituicao");


exports.findInstituicoesNotAprove = async() =>{
    return InstituicaoDAO.findInstituicoesNotAprove();
}


exports.create = async (model, object) => {  
    return GenericDAO.create(model,object);
    
};

exports.aprovar = async (id) => {  
    try {
		instituicao = await GenericDAO.findByPk(entity, id);

		return await InstituicaoDAO.aprovar(id, !instituicao.aprovado)
		
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
    return AbrigosDAO.buscarUm(id);
    
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
