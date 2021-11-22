const path = require('path');
const status = require("http-status");
const JWT = require('jsonwebtoken');
const { default: SignJWT } = require('jose/jwt/sign')
const bcrypt = require("bcryptjs");
const {cpf} = require('cpf-cnpj-validator');
const GenericDAO = require('../DAO/GenericDAO');
const UsuarioDAO = require('../DAO/UsuarioDAO');
const {getPrivateKey,getRefreshKey,getRecoveryKey} = require('../../config/keys');
const entity = require('../models/Usuario')
const Role = require('../../helpers/enums/Role');
const Usuario = require("../models/Usuario");

exports.create = async (request, response) => {  
    const credenciais = request.body;
    if(!cpf.isValid(credenciais.cpf)){
        throw {status:status.BAD_REQUEST, msg:"Cpf inválido."};
    }

    //Verifica se os dados de cadastro estão completos
	if (!credenciais || !credenciais.nome || !credenciais.email || !credenciais.senha || !credenciais.cpf || !credenciais.sexo || !credenciais.data_de_nascimento)
        throw {status:status.BAD_REQUEST, msg:"Dados insuficientes."};


    let senha = credenciais.senha;
    const salt = await bcrypt.genSalt();
    credenciais.senha = await bcrypt.hash(credenciais.senha, salt);

    credenciais.role = Role.NOTHING;

	try {

		await GenericDAO.create(entity,credenciais);

        credenciais.senha = senha;
		return this.login(request, response);

	} catch (error) { 
        console.log(error);
		throw error;  
	}
    
};
exports.login = async (request, response) => {  
    const { email, senha } = request.body;
    let  refresh_token  = request.refresh_token;
    let credenciais;

	try {

        if(!refresh_token){
            //Busca pelas credenciais de um operador e verifica se foi encontrado. 
            credenciais = await UsuarioDAO.buscarCredenciais(email);
            if(!credenciais) throw {status:status.NOT_FOUND, msg:"Crendencias Invalidas"};

            //Compara a senha preenchidas com a senha cadastrada
            const isValid = await bcrypt.compare(senha, credenciais.senha);
            if(!isValid) throw {status:status.NOT_FOUND, msg:"Crendencias Invalidas"};
        }else{
            //Busca, usando o refresh_token, pelas credenciais de um operador ativo e verifica se foi encontrado. 
            credenciais = await UsuarioDAO.buscarCredenciaisPorRefreshToken(refresh_token);
            if(!credenciais) throw {status:status.UNAUTHORIZED, msg:"'refresh_token inválido'"}; 
        }
        

        //Esta inserido perfil_id =0 porque nao existe perfil para usuario, permissoes estao relacionada mais direta com administradores
        //Insere o id do operador na carga do token
		const payload = { 
            usuario_id: credenciais.id,
            role:credenciais.role,
        };

        //Busca a chave para gerar o token
		const privateKey = await getPrivateKey();
        const refreshKey = await getRefreshKey();

		const token = await new SignJWT(payload)
		.setProtectedHeader({alg: 'ES256'})
		.setExpirationTime('45m')
		.sign(privateKey);

        refresh_token = await new SignJWT({})
		.setProtectedHeader({alg: 'ES256'})
		.setExpirationTime( '1h') //1 hora de validade
		.sign(refreshKey);

        //Atualiza o refresh_token do operador
        await UsuarioDAO.atualizarRefreshToken(credenciais.id, refresh_token);



        let usuario = await UsuarioDAO.findByPk(credenciais.id)

        //Responde a requisição de autenticação com o token de acesso
		return response.status(status.ACCEPTED).send({ usuario, token, refresh_token });


	} catch (error) {
        console.log(error);
		throw error;
	}
    
};

exports.update = async (object, id) => {
    
    return await UsuarioDAO.atualizar(id, object);
    
};

exports.setAbrigo = async (usuario_id, abrigo_id) => {
    
    return await UsuarioDAO.setAbrigo(usuario_id, abrigo_id);
    
};
exports.setInstituicao = async (usuario_id, abrigo_id) => {
    
    return await UsuarioDAO.setInstituicao(usuario_id, abrigo_id);
    
};
exports.setRole = async (usuario_id, abrigo_id) => {
    
    return await UsuarioDAO.setRole(usuario_id, abrigo_id);
    
};
exports.delete = async (id) => {
    return GenericDAO.destroy(Usuario,id);
    
};

exports.findByPk = async (id) => {
    return UsuarioDAO.findByPk(id);
    
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
