
const status = require("http-status");
const GenericServices = require('../services/GenericService');
const InstituicaoService = require("../services/InstituicaoService");
const entity = require("../models/Instituicao");
const UsuarioServices = require('../services/UsuarioService');

//Adiciona uma nova instancia da entidade.
exports.create = async (request, response, next) => {
	try {

		const instancia = await GenericServices.create(entity,request.body);

		if(instancia){
			const usuario = UsuarioServices.setInstituicao(request.usuario_id, instancia.id);
		}
		return (instancia ? response.status(status.CREATED).send(instancia) : response.status(status.BAD_REQUEST).send());

	} catch (error) { 
		next(error);  
	}
};

//Busca por uma instancia da entidade.
exports.findByPk = async (request, response, next) => {
	try {

		const instancia = await InstituicaoService.findByPk(request.params.id)
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
		throw  error;
	}
};

//Busca todas as instancias da entidade sem paginação.
exports.findAll = async (request, response, next) => {
	try {

		const instancias = await GenericServices.findAll(entity);
		return response.status(status.OK).send(instancias);

	} catch (error) {
		throw  error;
	}
};

//Busca todas as instancias da entidade sem paginação.
exports.findInstituicoesNotAprove = async (request, response, next) => {
	try {

		const instancias = await InstituicaoService.findInstituicoesNotAprove();
		return response.status(status.OK).send(instancias);

	} catch (error) {
		throw error;
	}
};

//Adiciona uma nova instancia da entidade.
exports.solicitarMembro = async (request, response, next) => {
	try {
		const instancia = await InstituicaoService.solicitarMembro(request.usuario_id, request.body.instituicao_id);
		
		return (instancia ? response.status(status.OK).send(instancia) : response.status(status.NOT_FOUND).send());
	} catch (error) { 
		next(error);  
	}
};
//Atualiza uma instancia da entidade.
exports.aprovarUsuario = async (request, response, next) => {
	try {
		
		
		const result = await InstituicaoService.aprovarUsuario(request.usuario_id, request.body.usuario_id)

		return (result ? response.status(status.OK).send( {result} ) : response.status(status.NOT_FOUND).send());
		
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

//Atualiza uma instancia da entidade.
exports.aprovar = async (request, response, next) => {
	try {
			
		const result = await InstituicaoService.aprovar(request.body.id)

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
