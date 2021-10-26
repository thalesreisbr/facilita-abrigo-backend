const Usuario = require("../models/Usuario")
const Abrigo = require("../models/Abrigo");
const Instituicao = require("../models/Instituicao");

//Adiciona uma nova instancia da entidade.
exports.cadastrar = async (credenciais) => {
	try {
		
		const instancia = await Usuario.create(credenciais,{include:[enderecos]});
		
		return ((instancia) ? instancia : null);

	} catch (error) {
		console.err(error); 
		throw error; 
	}
};

//Busca por uma instancia da entidade.
exports.buscarCredenciais = async (email) => {
	try {

		const instancia = await Usuario.findOne({attributes: ['id', 'senha', 'role'], where: { email }});
		return (instancia ? instancia : null);

	} catch (error) { 
		console.err(error);
		throw error;
	}
};
//Busca por uma instancia da entidade.
exports.buscarCredenciaisPorRefreshToken = async (token_refresh) => {
	try {

		const instancia = await Usuario.findOne({attributes: ['id'], where: { token_refresh}});
		return (instancia ? instancia : null);

	} catch (error) { 
		console.log(error);
		throw error;
	}
};

exports.atualizarRefreshToken = async (id, token_refresh) => {
	try {

		const instancia = await Usuario.findByPk(id);
		if(instancia){
			const updated = await Usuario.update({token_refresh:token_refresh}, { where: { id: instancia.id }});
			return { updated_id: instancia.id };
		}else{
			return null;
		}

	} catch (error) {
		console.err(error);
		throw error;
	}
};

//Busca por uma instancia da entidade.
exports.findByPk = async (id) => {
	try {

		const instancia = await Usuario.findByPk(id,{attributes: {exclude: ['senha']},
		include:[
			{model: Abrigo, as: "abrigo"},
			{model: Instituicao, as: "instituicao"}]});
		return (instancia ? instancia : null);

	} catch (error) { 
		console.err(error);
		throw error;
	}
};
//Busca por uma instancia da entidade.
exports.buscarPeloEmail = async (email) => {
	try {

		const instancia = await Usuario.findOne({attributes: {exclude: ['senha']},where :{email}});
		return (instancia ? instancia : null);

	} catch (error) { 
		console.err(error);
		throw error;
	}
};

//Busca todas as instancias da entidade.
exports.buscarTudo = async (limite, pagina) => {
	limite = parseInt(limite || 0);
	pagina = parseInt(pagina || 0);

	if (!Number.isInteger(limite) || !Number.isInteger(pagina)) {
		throw {error: 'Parâmetros de busca inválidos.'}
	}

	const ITENS_POR_PAGINA = 100;
	limite = limite > ITENS_POR_PAGINA || limite <= 0 ? ITENS_POR_PAGINA : limite;
	const offset = pagina <= 0 ? 0 : pagina * limite;

	try {

		const instancias = await Usuario.findAll({limit: limite, offset: offset, 
			attributes: ['id', 'nome', 'email'],
		});
		const total = await Usuario.count({});
		
		const totalPaginas = total > limite ? parseInt(total / limite) : 1;	

		return { total, pagina, totalPaginas, limite, offset, instancias };

	} catch (error) {
		console.err(error);
		throw error;
	}
};

//Busca todas as instancias da entidade sem paginação.
exports.buscarTudoSemPaginacao = async () => {
	try {

		const instancias = await Usuario.findAll({
			attributes: ['id', 'name', 'email'],
		});
		return instancias;

	} catch (error) {
		console.log(error);
		 throw error;
	}
};

//Atualiza uma instancia da entidade.
exports.atualizar = async (id, body) => {
	try {

		const instancia = await Usuario.findByPk(id);
		if(instancia){
			await Usuario.update(body, { where: { id: instancia.id }})
			return { updated_id: instancia.id };
		}else{
			return null;
		}

	} catch (error) {
		console.log(error);
		throw error;
	}
};

exports.setAbrigo = async (usuario_id, abrigo_id) => {
	try {

		const instancia = await Usuario.findByPk(usuario_id);
		if(instancia){
			const updated = await Usuario.update({"abrigo_id":abrigo_id}, { where: { id: instancia.id }});
				return { updated_id: instancia.id }
		
		}else{
			return null;
		}

	} catch (error) {
		console.log(error);
		throw error;
	}
};
exports.setInstituicao = async (usuario_id, instituicao_id) => {
	try {

		const instancia = await Usuario.findByPk(usuario_id);
		if(instancia){
			await Usuario.update({"instituicao_id":instituicao_id}, { where: { id: instancia.id }});
				return { updated_id: instancia.id }
		
		}else{
			return null;
		}

	} catch (error) {
		console.log(error);
		throw error;
	}
};
exports.atualizarSenha = async (id, senha) => {
	try {

		const instancia = await Usuario.findByPk(id);
		if(instancia){
			 await Usuario.update({senha:senha}, { where: { id: instancia.id }});
			return { updated_id: instancia.id };
		}else{
			return null;
		}

	} catch (error) {
		console.log(error);
		throw error;
	}
};

//Exclui uma instancia da entidade.
exports.excluir = async (id) => {
	try {

		const instancia = await Usuario.findByPk(id);
		if(instancia){
			 await Usuario.destroy({ where: { id: instancia.id } });
			return { deleted_id: instancia.id };
		}else{
			return null;
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};

//Soft Delete excluindo apenas informaçãoes pessoais
exports.excluirParcialmente = async (id) => {
	try {
		let deleted;
		let instancia = await Usuario.findByPk(id);
		if(instancia){
			await Usuario.update({nome:null,email:null,cpf:null,senha:null},{where: { id: instancia.id } }).then(
				async ()=>{
					let instancia_endereco = await enderecos.findByPk(instancia.endereco_id);
					if(instancia_endereco){
						instancia_endereco.endereco = null;
						await enderecos.update(instancia_endereco, {where : { id :instancia.endereco_id}}).then(
							async ()=>{
								deleted = await Usuario.destroy({ where: { id: instancia.id } });
							}
						);
					}
					
				}

			);
			
			return (deleted) ? {deleted_id:instancia.id} : null;
		}else{
			return null;
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};

exports.atualizarTokenRecuperacao = async (id, token_recuperacao) => {
	try {

		const instancia = await Usuario.findByPk(id);
		if(instancia){
			await Usuario.update({token_recuperacao:token_recuperacao}, { where: { id: instancia.id }});
			return { updated_id: instancia.id };
		}else{
			return null;
		}

	} catch (error) {
		console.log(error);
		throw error;
	}
}

//Verifica se o operador possui algum dos perfis exigidos.
// exports.verificarRole = async (operator_id, roles) => {
// 	try {
// 		const instancia = await Usuario.findOne({
// 			attributes: ['id'],
// 			where: {[Op.and]: [{id: operator_id}, {[Op.or]: {role_id: roles}}]}
// 		});
// 		return (instancia ? true : false);

// 	} catch (error) { 
// 		throw error;
// 	}
// };


