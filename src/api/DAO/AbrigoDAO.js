

const status = require("http-status");
const { Op } = require("sequelize");
const database = require("../../config/database");
const entity = require("../models/Abrigo");
const Quarto = require('../models/Quarto');
const Usuario = require('../models/Usuario');
const Role = require("../../helpers/enums/Role");
//Busca por uma instancia da entidade.
exports.findByPk = async (id) => {
	try {

		const instancia = await entity.findByPk(id,{
			include: {
				model: Quarto,
				as:"quartos"
			}
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
exports.findAbrigosAprovados = async (id) => {
	try {
        return await entity.findAll({
            where: {"aprovado": true}
        })
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
		entity.update({"aprovado":valor}, {
			where:{"id":id}
		})
	}catch (error) {
		throw error;
	}
};

