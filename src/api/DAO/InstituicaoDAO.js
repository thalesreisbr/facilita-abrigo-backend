

const status = require("http-status");
const { Op } = require("sequelize");
const database = require("../../config/database");
const Usuario = require('../models/Usuario');
const entity = require("../models/Instituicao");
const Quarto = require('../models/Quarto')

//Busca por uma instancia da entidade.
exports.findInstituicoesNotAprove = async (id) => {
	try {
        return await entity.findAll({
            where: {"aprovado": false}
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
		console.log(error);
		throw error;
	}
};


//Busca por uma instancia da entidade.
exports.findByPk = async (id) => {
	try {

		const instancia = await entity.findByPk(id,{
			include: [
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

