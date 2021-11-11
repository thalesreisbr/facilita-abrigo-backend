

const status = require("http-status");
const { Op } = require("sequelize");
const database = require("../../config/database");
const entity = require("../models/Abrigo");
const Quarto = require('../models/Quarto');
const Imagens = require('../models/Imagens')
const Usuario = require('../models/Usuario');
const Role = require("../../helpers/enums/Role");
const Caracteristica = require("../models/Caracteristica");
//Busca por uma instancia da entidade.
exports.findByPk = async (id) => {
	try {

		const instancia = await entity.findByPk(id,{
			include: 
				[{
					model: Quarto,
					as:"quartos",
					include:[
						{
							model: Imagens,
							as: "imagens",
						},
						{
							model: Caracteristica,
							as: "caracteristicas",
						},
				],

				},
				{
					model: Usuario,
					as: "funcionarios",
				}]
			
		});
		return (instancia ? instancia : null);

	} catch (error) {
		console.log(error);
		throw error;
	}
};

exports.findAbrigosNaoAprovados = async (id) => {
	try {
        return await entity.findAll({
            where: {"aprovado": false}
        })
	} catch (error) {
		console.log(error);
		throw error;
	}
};
exports.findAbrigos = async (limit, page, filter) => {
	limit = parseInt(limit || 0);
	page = parseInt(page || 0);

	if (!Number.isInteger(limit) || !Number.isInteger(page)) {
		throw  new Error("Invalid Parameters: " + 404);
	}

	const ITENS_PER_PAGE = 100;
	limit = limit > ITENS_PER_PAGE || limit <= 0 ? ITENS_PER_PAGE : limit;
	const offset = page <= 0 ? 0 : page * limit;

	try {
		let instancias;
		if(filter)
			instancias = await entity.findAll({
				where: filter,
				limit: limit,offset: offset });	
		
		else{
			instancias = await entity.findAll({limit: limit,offset: offset });	
		}
			
		const quantityTotalObjects = await entity.count({});
		
		const quantityPages = quantityTotalObjects > limit ? parseInt(quantityTotalObjects / limit) : 1;	

		return { quantityTotalObjects, page, quantityPages, limit, offset, instancias };

	} catch (error) {
    	console.log(error);
		throw error;
	}
};

exports.findUsuariosNaoAprovadosById = async (id) => {
	try {
        return await entity.findAll({
            where: {"aprovado": true},
			include: {
				model: Usuario,
				as: "funcionarios",
				where: {"role":Role.NOTHING}
			}
        })
	} catch (error) {
		console.log(error);
		throw error;
	}
};


exports.aprovar = async (id, valor) => {
	try{
		return await entity.update({"aprovado":valor}, {
			where:{"id":id}
		})
	}catch (error) {
		throw error;
	}
};

