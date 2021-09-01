const path = require('path');
const status = require("http-status");
const JWT = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const {cpf} = require('cpf-cnpj-validator');
const GenericDAO = require('../DAO/GenericDAO');
const entity = require('../models/Usuario')

exports.create = async (request, response, next) => {  
    const credenciais = request.body;
    if(!cpf.isValid(credenciais.cpf)){
        return response.status(status.BAD_REQUEST).send({msg: 'Cpf inválido.'});
    }

    //Verifica se os dados de cadastro estão completos
	if (!credenciais || !credenciais.nome || !credenciais.email || !credenciais.senha || !credenciais.cpf || !credenciais.sexo || !credenciais.data_de_nascimento)
        return response.status(status.BAD_REQUEST).send({msg: 'Dados insuficientes.'});

    const salt = await bcrypt.genSalt();
    credenciais.senha = await bcrypt.hash(credenciais.senha, salt);

	try {

		const instancia = await GenericDAO.create(entity,credenciais);
		return (instancia ? response.status(status.CREATED).send({usuario_id:instancia.id}) : response.status(status.BAD_REQUEST).send());

	} catch (error) { 
		next(error);  
	}
    
};

exports.update = async (model, object, id) => {
    return GenericDAO.update(model,object,id);
    
};
exports.delete = async (model, id) => {
    return GenericDAO.destroy(model,id);
    
};

exports.findByPk = async (model, id) => {
    return GenericDAO.findByPk(model,id);
    
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
