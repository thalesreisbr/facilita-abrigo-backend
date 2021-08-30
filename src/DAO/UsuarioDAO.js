

// const status = require("http-status");
// const { Op } = require("sequelize");
// const database = require("../config/database");
// const IniciarModels = require("../models/init-models");
// const {Usuario:entity} = require("../models/")

// //Adiciona uma nova instancia da entidade.
// exports.cadastrar = async (credenciais) => {
// 	try {
		
// 		const instancia = await entity.create(credenciais,{include:[enderecos]});
		
// 		return (((instancia)) ? instancia : null);

// 	} catch (error) { 
// 		throw error; 
// 	}
// };

// //Busca por uma instancia da entidade.
// exports.buscarCredenciais = async (email) => {
// 	try {

// 		const instancia = await entity.findOne({attributes: ['id', 'senha'], where: { email }});
// 		return (instancia ? instancia : null);

// 	} catch (error) { 
// 		throw error;
// 	}
// };
// //Busca por uma instancia da entidade.
// exports.buscarCredenciaisPorRefreshToken = async (refresh_token) => {
// 	try {

// 		const instancia = await entity.findOne({attributes: ['id'], where: { refresh_token}});
// 		return (instancia ? instancia : null);

// 	} catch (error) { 
// 		throw error;
// 	}
// };;
// exports.atualizarRefreshToken = async (id, refresh_token) => {
// 	try {

// 		const instancia = await entity.findByPk(id);
// 		if(instancia){
// 			const updated = await entity.update({refresh_token:refresh_token}, { where: { id: instancia.id }});
// 			return { updated_id: instancia.id };
// 		}else{
// 			return null;
// 		}

// 	} catch (error) {
// 		throw error;
// 	}
// };

// //Busca por uma instancia da entidade.
// exports.buscarUm = async (id) => {
// 	try {

// 		const instancia = await entity.findByPk(id,{attributes: {exclude: ['senha']},include:[enderecos]});
// 		return (instancia ? instancia : null);

// 	} catch (error) { 
// 		throw error;
// 	}
// };
// //Busca por uma instancia da entidade.
// exports.buscarPeloEmail = async (email) => {
// 	try {

// 		const instancia = await entity.findOne({attributes: {exclude: ['senha']},where :{email}});
// 		return (instancia ? instancia : null);

// 	} catch (error) { 
// 		throw error;
// 	}
// };

// //Busca todas as instancias da entidade.
// exports.buscarTudo = async (limite, pagina) => {
// 	limite = parseInt(limite || 0);
// 	pagina = parseInt(pagina || 0);

// 	if (!Number.isInteger(limite) || !Number.isInteger(pagina)) {
// 		throw {error: 'Parâmetros de busca inválidos.'}
// 	}

// 	const ITENS_POR_PAGINA = 100;
// 	limite = limite > ITENS_POR_PAGINA || limite <= 0 ? ITENS_POR_PAGINA : limite;
// 	const offset = pagina <= 0 ? 0 : pagina * limite;

// 	try {

// 		const instancias = await entity.findAll({limit: limite, offset: offset, 
// 			attributes: ['id', 'nome', 'email'],
// 		});
// 		const total = await entity.count({});
		
// 		const totalPaginas = total > limite ? parseInt(total / limite) : 1;	

// 		return { total, pagina, totalPaginas, limite, offset, instancias };

// 	} catch (error) {
// 		throw error;
// 	}
// };

// //Busca todas as instancias da entidade sem paginação.
// exports.buscarTudoSemPaginacao = async () => {
// 	try {

// 		const instancias = await entity.findAll({
// 			attributes: ['id', 'name', 'email'],
// 		});
// 		return instancias;

// 	} catch (error) {
// 		 throw error;
// 	}
// };

// //Atualiza uma instancia da entidade.
// exports.atualizar = async (id, body) => {
// 	try {

// 		const instancia = await entity.findByPk(id);
// 		if(instancia){
// 			const updated = await entity.update(body, { where: { id: instancia.id }}).then(
// 				async (updated)=>{
// 					if(body.endereco){
// 						await enderecos.update(body.endereco,{where:{id:instancia.endereco_id}});
// 					}
// 				});
// 			return { updated_id: instancia.id };
// 		}else{
// 			return null;
// 		}

// 	} catch (error) {
// 		throw error;
// 	}
// };
// exports.atualizarSenha = async (id, senha) => {
// 	try {

// 		const instancia = await entity.findByPk(id);
// 		if(instancia){
// 			const updated = await entity.update({senha:senha}, { where: { id: instancia.id }});
// 			return { updated_id: instancia.id };
// 		}else{
// 			return null;
// 		}

// 	} catch (error) {
// 		throw error;
// 	}
// };

// //Exclui uma instancia da entidade.
// exports.excluir = async (id) => {
// 	try {

// 		const instancia = await entity.findByPk(id);
// 		if(instancia){
// 			const deleted = await entity.destroy({ where: { id: instancia.id } });
// 			return { deleted_id: instancia.id };
// 		}else{
// 			return null;
// 		}
// 	} catch (error) {
// 		throw error;
// 	}
// };

// //Soft Delete excluindo apenas informaçãoes pessoais
// exports.excluirParcialmente = async (id) => {
// 	try {
// 		let deleted;
// 		let instancia = await entity.findByPk(id);
// 		if(instancia){
// 			await entity.update({nome:null,email:null,cpf:null,senha:null},{where: { id: instancia.id } }).then(
// 				async ()=>{
// 					let instancia_endereco = await enderecos.findByPk(instancia.endereco_id);
// 					if(instancia_endereco){
// 						instancia_endereco.endereco = null;
// 						await enderecos.update(instancia_endereco, {where : { id :instancia.endereco_id}}).then(
// 							async ()=>{
// 								deleted = await entity.destroy({ where: { id: instancia.id } });
// 							}
// 						);
// 					}
					
// 				}

// 			);
			
// 			return (deleted) ? {deleted_id:instancia.id} : null;
// 		}else{
// 			return null;
// 		}
// 	} catch (error) {
// 		throw error;
// 	}
// };

// exports.atualizarTokenRecuperacao = async (id, token_recuperacao) => {
// 	try {

// 		const instancia = await entity.findByPk(id);
// 		if(instancia){
// 			const updated = await entity.update({token_recuperacao:token_recuperacao}, { where: { id: instancia.id }});
// 			return { updated_id: instancia.id };
// 		}else{
// 			return null;
// 		}

// 	} catch (error) {
// 		throw error;
// 	}
// }

// //Verifica se o operador possui algum dos perfis exigidos.
// // exports.verificarRole = async (operator_id, roles) => {
// // 	try {
// // 		const instancia = await entity.findOne({
// // 			attributes: ['id'],
// // 			where: {[Op.and]: [{id: operator_id}, {[Op.or]: {role_id: roles}}]}
// // 		});
// // 		return (instancia ? true : false);

// // 	} catch (error) { 
// // 		throw error;
// // 	}
// // };


