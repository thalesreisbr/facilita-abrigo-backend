

const status = require("http-status");
const { Op } = require("sequelize");
const database = require("../config/database");
const entity = require("../models/Abrigos");
const Quartos = require('../models/Quartos')

//Busca por uma instancia da entidade.
exports.buscarUm = async (id) => {
	try {

		const instancia = await entity.findByPk(id,{
			include: {
				model: Quartos,
				as:"quartos"
			}
		});
		return (instancia ? instancia : null);

	} catch (error) {
		console.log(error);
		throw error;
	}
};


