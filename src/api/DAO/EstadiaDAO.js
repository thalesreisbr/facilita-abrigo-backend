

const status = require("http-status");
const { Op } = require("sequelize");
const database = require("../../config/database");
const entity = require("../models/Estadia");
const Quarto = require('../models/Quarto');
const Usuario = require('../models/Usuario');
const Role = require("../../helpers/enums/Role");

const Abrigo = require("../models/Abrigo");
const Imagens = require("../models/Imagens")
const sequelize = require("../../config/database");
const Instituicao = require("../models/Instituicao");
const Abrigado = require("../models/Abrigado");
const Evento = require("../models/Evento");

exports.findByPk = async (id) => {
	try {

		const instancia = await entity.findByPk(id,{
			include: 
				[{
					model: Quarto,
					as: "quarto",
					include: {
						model: Abrigo,
						as: "abrigo"
					}
				},
				{
					model: Instituicao,
					as: "instituicao",
				},
				{
					model: Abrigado,
					as: "abrigado",
				},
				{
					model: Evento,
					as : "eventos"
				}
			]
			
		});
		return (instancia ? instancia : null);

	} catch (error) {
		console.log(error);
		throw error;
	}
};
exports.findAll = async (abrigo_id, instituicao_id) => {
	try {

		const instancia = await entity.findAll({
			// where : [	
			// 	{
			// 		"instituicao_id":instituicao_id
			// 	},
			// ],
			include: 
				[{
					model: Quarto,
					as: "quarto",
					include: {
						model: Abrigo,
						as: "abrigo"
					}

				},
				{
					model: Instituicao,
					as: "instituicao",
				},
				{
					model: Abrigado,
					as: "abrigado",
				},
			]
			
		});
		return (instancia ? instancia : null);

	} catch (error) {
		console.log(error);
		throw error;
	}
};
exports.findByAbrigoAndInsituicao = async (abrigo_id, instituicao_id) => {
	try {

		const instancia = await entity.findAll({
			where : [	
				{
					"instituicao_id":instituicao_id
				},
			],
			include: 
				[{
					model: Quarto,
					as: "quarto",
					where: {
						"abrigo_id":abrigo_id,
					},
					include: {
						model: Abrigo,
						as: "abrigo"
					}

				},
				{
					model: Instituicao,
					as: "instituicao",
				},
				{
					model: Abrigado,
					as: "abrigado",
				},
			],
			order: [
				["data_inicio","DESC"]
			]
			
		});
		return (instancia ? instancia : null);

	} catch (error) {
		console.log(error);
		throw error;
	}
};
exports.findByAbrigo = async (abrigo_id) => {
	try {

		const instancia = await entity.findAll({
			include: 
				[{
					model: Quarto,
					as: "quarto",
					where: {
						"abrigo_id":abrigo_id,
					},
					include: {
						model: Abrigo,
						as: "abrigo"
					}
				},
				{
					model: Instituicao,
					as: "instituicao",
				},
				{
					model: Abrigado,
					as: "abrigado",
				},
			],
			order: [
				["data_inicio","DESC"]
			]
			
		});
		return (instancia ? instancia : null);

	} catch (error) {
		console.log(error);
		throw error;
	}
};
exports.findByInsituicao = async (instituicao_id) => {
	try {

		const instancia = await entity.findAll({
			where : [	
				{
					"instituicao_id":instituicao_id
				},
			],
			include: 
				[{
					model: Quarto,
					as: "quarto",
					include: {
						model: Abrigo,
						as: "abrigo"
					}
				},
				{
					model: Instituicao,
					as: "instituicao",
				},
				{
					model: Abrigado,
					as: "abrigado",
				},
			],
			order: [
				["data_inicio","DESC"]
			]
			
		});
		return (instancia ? instancia : null);

	} catch (error) {
		console.log(error);
		throw error;
	}
};    