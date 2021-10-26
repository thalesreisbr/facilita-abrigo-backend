const status = require("http-status");
const GenericServices = require('../services/GenericService');
const QuartoServices = require('../services/QuartoService');
const entity = require("../models/Quarto");

//Adiciona uma nova instancia da entidade.
exports.create = async (request, response, next) => {
	try {

		const instancia = await GenericServices.create(entity,request.body);
		return (instancia ? response.status(status.CREATED).send(instancia) : response.status(status.BAD_REQUEST).send());

	} catch (error) { 
		next(error);  
	}
};

//Busca por uma instancia da entidade.
exports.findByPk = async (request, response, next) => {
	try {

		const instancia = await QuartoServices.findByPk(request.params.id)
		return (instancia ? response.status(status.OK).send(instancia) : response.status(status.NOT_FOUND).send());

	} catch (error) { 
		next(error);
	}
};

//Busca por uma instancia da entidade.
exports.addCaracteristica = async (request, response, next) => {
	try {

		const instancia = await QuartoServices.addCaracteristica(request.usuario_id, request.params.id, request.body.caracteristicas_ids);
		return (instancia ? response.status(status.OK).send({novas_caracteristica:instancia}) : response.status(status.NOT_FOUND).send());

	} catch (error) { 
		next(error);
	}
};

exports.deleteCaracteristica = async (request, response, next) => {
	try {

		const instancia = await QuartoServices.deleteCaracteristica(request.usuario_id, request.params.id, request.body.caracteristica_id);
		return (instancia ? response.status(status.OK).send(instancia) : response.status(status.NOT_FOUND).send());

	} catch (error) { 
		next(error);
	}
};




//Busca todas as instancias da entidade.
exports.findAllWithPagination = async (request, response, next) => {
	let { limit, page } = request.query;

	try {
		const instancias = await GenericServices.findAllWithPagination(entity,limit, page);
		
		return response.status(status.OK).send(instancias);
	} catch (error) {
		next(error);
	}
};
//Busca todas as instancias da entidade.
exports.filtrar = async (request, response, next) => {
	let { limit, data_inicial } = request.query;

	try {
		const instancias = await QuartoServices.filtrar(data_inicial);
		
		return response.status(status.OK).send(instancias);
	} catch (error) {
		next(error);
	}
};


//Busca todas as instancias da entidade sem paginação.
exports.findAll = async (request, response, next) => {
	try {

		const instancias = await GenericServices.findAll(entity);
		return response.status(status.OK).send(instancias);

	} catch (error) {
		next(error);
	}
};

//Atualiza uma instancia da entidade.
exports.update = async (request, response, next) => {
	try {

		const result = await GenericServices.update(entity, request.body,request.params.id)
		return (result ? response.status(status.OK).send( {updated_id:request.params.id} ) : response.status(status.NOT_FOUND).send());
		
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
