const status = require("http-status");
const GenericDAO = require('../DAO/GenericDAO');
const AbrigosDAO = require('../DAO/AbrigoDAO');
const entity = require("../models/Abrigo");
const UsuarioService = require("../services/UsuarioService");
const Role = require('../../helpers/enums/Role');
const Abrigo = require("../models/Abrigo");

exports.create = async (model, object) => {  
    return GenericDAO.create(model,object);
    
};

exports.solicitarMembro = async(usuario_id, abrigo_id) =>{
    try {
        let usuario = await UsuarioService.findByPk(usuario_id);

        if(usuario.role == Role.NOTHING && usuario.abrigo_id == null && usuario.instituicao_id == null){
            abrigo = await AbrigosDAO.findByPk(abrigo_id);
            if(abrigo == null)
                throw {status:status.INTERNAL_SERVER_ERROR, msg:"Abrigo não existe"};
            
            if(!abrigo.aprovado)
                throw {status:status.INTERNAL_SERVER_ERROR, msg:"Abrigo ainda não esta aprovado"};
                

            usuario.abrigo_id = abrigo.id;

            result  = await UsuarioService.setAbrigo(usuario.id, abrigo.id);
            return result;
        }else{
            throw new Error("Não é possivel");
        }
            
        
	} catch (error) {
        console.log(error)
		throw error;
	}
    
    
}


exports.findAbrigosNaoAprovados = async() =>{
    return AbrigosDAO.findAbrigosNaoAprovados();
}

exports.findAbrigos = async(limit, page, filter) =>{
    return AbrigosDAO.findAbrigos(limit, page, filter);
}

exports.aprovarCriacao = async (id) => {  
    try {
        
            let abrigo = await AbrigosDAO.findByPk(id);


            let user_owner = abrigo.funcionarios[0];
            await UsuarioService.setRole(user_owner.id, Role.OWNER);

		    return await AbrigosDAO.aprovar(id, !abrigo.aprovado);  
        
		
	} catch (error) {
        console.log(error);
		throw error;
	}
    
};
exports.aprovarUsuario = async (usuarioAprovador_id, usuario_id) => {  
    try {
        let usuarioAprovador = await UsuarioService.findByPk(usuarioAprovador_id);
		let usuario = await UsuarioService.findByPk(usuario_id);

        if(!((usuarioAprovador.role == Role.OWNERn && usuarioAprovador.abrigo_id == usuario.abrigo_id) || (usuarioAprovador.role  == Role.ADM)))
            throw {status:status.INTERNAL_SERVER_ERROR, msg:"Este Usuario de nome: "+usuarioAprovador.nome+" nao pode aprovar: "+usuario.nome};
            

		
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
    return AbrigosDAO.findByPk(id);
    
};
exports.findUsuariosNaoAprovadosById = async (id) => {
    return AbrigosDAO.findUsuariosNaoAprovadosById(id);
    
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
