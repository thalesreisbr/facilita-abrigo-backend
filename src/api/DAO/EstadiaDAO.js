

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

exports.findByPk = async (id) => {
	try {

		const instancia = await entity.findByPk(id,{
			include: 
				[{
					model: Quarto,
					as: "quarto"
				},
				{
					model: Instituicao,
					as: "insituicao",
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

exports.findAll = async (id) => {
	try {

		const instancia = await entity.findAll({
			include: 
				[{
					model: Quarto,
					as: "quarto"
				},
				{
					model: Instituicao,
					as: "insituicao",
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