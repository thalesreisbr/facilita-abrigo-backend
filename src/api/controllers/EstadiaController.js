const status = require("http-status");
const GenericServices = require('../services/GenericService');
const entity = require("../models/Estadia");
const EstadiaService = require("../services/EstadiaService")

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

		const instancia = await EstadiaService.findByPk(request.params.id)
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

//Busca todas as instancias da entidade sem paginação.
exports.findAll = async (request, response, next) => {
	try {

		let {abrigo_id, instituicao_id} = request.query;
		const instancias = await EstadiaService.findAll(abrigo_id, instituicao_id);
		return response.status(status.OK).send(instancias);

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

		const result = await GenericServices.delete(entity,request.params.id)
		return (result ? response.status(status.OK).send( {deleted_id:result} ) : response.status(status.NOT_FOUND).send());
		
	} catch (error) {
		next(error);
	}
};
