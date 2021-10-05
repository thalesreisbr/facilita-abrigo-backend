
const status = require("http-status");
const GenericServices = require('../services/GenericService');
const AbrigoServices = require('../services/AbrigoService');
const entity = require("../models/Abrigo");
const UsuarioServices = require('../services/UsuarioService');

//Adiciona uma nova instancia da entidade.
exports.create = async (request, response, next) => {
	try {
		abrigo = request.body;
		donoAbrigo = request.usuario_id
		

		const instancia = await GenericServices.create(entity,request.body);
		return (instancia ? response.status(status.CREATED).send(instancia) : response.status(status.BAD_REQUEST).send());

	} catch (error) { 
		next(error);  
	}
};

//Adiciona uma nova instancia da entidade.
exports.solicitarMembro = async (request, response, next) => {
	try {
		const instancia = await AbrigoServices.solicitarMembro(request.usuario_id, request.body.abrigo_id);
		console.log(instancia);
		return (instancia ? response.status(status.OK).send(instancia) : response.status(status.NOT_FOUND).send());
	} catch (error) { 
		next(error);  
	}
};

exports.findUsuariosNaoAprovadosById = async (request, response, next) => {
	try {

		const instancia = await AbrigoServices.findUsuariosNaoAprovadosById(request.query.abrigo_id)
		return (instancia ? response.status(status.OK).send(instancia) : response.status(status.NOT_FOUND).send());

	} catch (error) { 
		next(error);
	}
};


//Busca por uma instancia da entidade.
exports.findByPk = async (request, response, next) => {
	try {

		const instancia = await AbrigoServices.findByPk(request.params.id)
		return (instancia ? response.status(status.OK).send(instancia) : response.status(status.NOT_FOUND).send());

	} catch (error) { 
		next(error);
	}
};

//Busca todas as instancias da entidade.
exports.findAllWithPagination = async (request, response, next) => {
	let { limit, page} = request.query;

	try {
		const instancias = await GenericServices.findAllWithPagination(entity,limit, page,);
		
		return response.status(status.OK).send(instancias);
	} catch (error) {
		next(error);
	}
};

//Busca todas as instancias da entidade sem paginação.
exports.findAll = async (request, response, next) => {
	try {
		let {limit, page, filter, value} = request.query;
		if(filter){
			value = (value == "true"? true: value=="false"?false : value)
			filter = { filter : value}
		}
		
		const instancias = await AbrigoServices.findAbrigosAprovados(limit, page, filter, value);
		return response.status(status.OK).send(instancias);

	} catch (error) {
		next(error);
	}
};

//Atualiza uma instancia da entidade.
exports.aprovarUsuario = async (request, response, next) => {
	try {
		
		
		const result = await AbrigoServices.aprovarUsuario(request.usuario_id, request.body.usuario_id)

		return (result ? response.status(status.OK).send( {updated_id:result[0]} ) : response.status(status.NOT_FOUND).send());
		
	} catch (error) {
		next(error);
	}
};


//Atualiza uma instancia da entidade.
exports.aprovarCriacao = async (request, response, next) => {
	try {
		
		
		const result = await AbrigoServices.aprovarCriacao(request.body.abrigo_id, request.role)

		return (result ? response.status(status.OK).send( {updated_id:result[0]} ) 
		: response.status(status.NOT_FOUND).send());
		
	} catch (error) {
		next(error);
	}
};


//Atualiza uma instancia da entidade.
exports.update = async (request, response, next) => {
	try {

		const result = await GenericServices.update(entity, request.body,request.params.id)
		return (result ? response.status(status.OK).send( {updated_id:result[0]} ) : response.status(status.NOT_FOUND).send());
		
	} catch (error) {
		next(error);
	}
};

//Exclui uma instancia da entidade.
exports.delete = async (request, response, next) => {
	try {

		const result = await GenericServices.excluir(request.params.id)
		return (result ? response.status(status.OK).send( {deleted_id:result} ) : response.status(status.NOT_FOUND).send());
		
	} catch (error) {
		next(error);
	}
};
