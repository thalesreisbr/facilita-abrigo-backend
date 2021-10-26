const GenericDAO = require('../DAO/GenericDAO');
const InstituicaoDAO = require('../DAO/InstituicaoDAO');
const Instituicao = require('../models/Instituicao');
const UsuarioService = require('../services/UsuarioService');
const entity = require("../models/Instituicao");
const Role = require('../../helpers/enums/Role');

exports.findInstituicoesNotAprove = async() =>{
    return InstituicaoDAO.findInstituicoesNotAprove();
}


exports.create = async (model, object) => {  
    return GenericDAO.create(model,object);
    
};

exports.aprovar = async (id) => {  
    try {
		instituicao = await InstituicaoDAO.findByPk(id);

        let user_owner = instituicao.funcionarios[0];

        user_owner.role = Role.OWNER;
        usuario_aprovado = await UsuarioService.setInstituicao( user_owner.id,instituicao.id);


		await InstituicaoDAO.aprovar(id, !instituicao.aprovado)
		
        return id;
	} catch (error) {
        console.log(error);
		throw error;
	}
    
};
exports.solicitarMembro = async(usuario_id, instituicao_id) =>{
    try {
        let usuario = await UsuarioService.findByPk(usuario_id);

        if(usuario.role == Role.NOTHING && usuario.instituicao_id == null && usuario.instituicao_id == null){
            instituicao = await InstituicaoDAO.findByPk(instituicao_id);
            if(instituicao == null)
                throw {status:status.INTERNAL_SERVER_ERROR, msg:"instituicao não existe"};
            
            if(!instituicao.aprovado)
                throw {status:status.INTERNAL_SERVER_ERROR, msg:"instituicao ainda não esta aprovado"};
                

            usuario.instituicao_id = instituicao.id;

            result  = await UsuarioService.setInstituicao(usuario.id, instituicao.id);
            return result;
        }else{
            throw new Error("Não é possivel");
        }
            
        
	} catch (error) {
        console.log(error)
		throw error;
	}
    
    
}
exports.aprovarUsuario = async (usuarioAprovador_id, usuario_id) => {  
    try {
        let usuarioAprovador = await UsuarioService.findByPk(usuarioAprovador_id);
		let usuario = await UsuarioService.findByPk(usuario_id);

        if(!((usuarioAprovador.role == Role.MEMBER && usuarioAprovador.instituicao_id == usuario.instituicao_id) || (usuarioAprovador.role  == Role.ADM)))
            throw {status:status.INTERNAL_SERVER_ERROR, msg:"Este Usuario de nome"+usuarioAprovador.nome+" nao pode aprovor"+usuario.nome};
            

		
        if(usuario.role == Role.NOTHING){
            
            usuario.role = Role.MEMBER;
            usuarioUpdate = {
                role: Role.MEMBER
            }
            const result = await UsuarioService.update(usuarioUpdate, usuario.id);

            return {"msg":usuario.nome+" foi aprovado"};
        }
		
		throw new Error("Usuario já é funcionario ou dono");
		

	} catch (error) {
        console.log(error)
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
    return InstituicaoDAO.findByPk(id);
    
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
