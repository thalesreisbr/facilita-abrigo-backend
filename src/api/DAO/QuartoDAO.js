

const status = require("http-status");
const { Op } = require("sequelize");
const database = require("../../config/database");
const entity = require("../models/Quarto");
const Quarto = require('../models/Quarto');
const Usuario = require('../models/Usuario');
const Role = require("../../helpers/enums/Role");
const Caracteristica = require("../models/Caracteristica");
const Caracteristica_Quartos = require("../models/Caracteristica_Quartos");
const Abrigo = require("../models/Abrigo");
const Imagens = require("../models/Imagens")
const sequelize = require("../../config/database");
//Busca por uma instancia da entidade.
exports.findByPk = async (id) => {
	try {

		const instancia = await entity.findByPk(id,{
			include: 
				[{
					model: Caracteristica,
					as: "caracteristicas" 
				},
				{
					model: Abrigo,
					as: "abrigo",
				},
				{
					model: Imagens,
					as: "imagens",
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
					model: Caracteristica,
					as: "caracteristicas" 
				},
				{
					model: Abrigo,
					as: "abrigo",
				},
				{
					model: Imagens,
					as: "imagens",
				},
			]
			
		});
		return (instancia ? instancia : null);

	} catch (error) {
		console.log(error);
		throw error;
	}
};
exports.findByDisponibilidadeAndCidade = async (dataInicial, cidade) => {
	try {
	// 	const sql = `
	// 	SELECT q.*, a.*, cq.*  FROM "Quarto" as q 
	// 	INNER JOIN "Abrigo" as a ON q.abrigo_id = a.id
	// 	INNER JOIN "Caracteristica_Quartos" as cq ON cq.quarto_id = q.id
	// 	WHERE (SELECT COUNT(id) FROM "Estadia" as e WHERE  e.data_saida >  '${dataInicial}' AND e.quarto_id = q.id ) < q.capacidade;
	// `
	const sql = `
		SELECT q.*  quarto, a.nome nome_abrigo, a.cep  FROM "Quarto" as q
		INNER JOIN "Abrigo" as a ON q.abrigo_id = a.id
		WHERE (SELECT COUNT(id) FROM "Estadia" as e WHERE  e.data_saida >  '${dataInicial}' AND e.quarto_id = q.id ) < q.capacidade
		AND a.cidade ~*'${cidade}';
	`
		return await sequelize.query(sql, {
			type: sequelize.QueryTypes.SELECT
		})
		

	} catch (error) {
		console.log(error);
		throw error;
	}
};



exports.addCaracteristica = async (quarto_id, caracteristica_id) => {
	try {
        const sql = `
			INSERT INTO "Caracteristica_Quartos" (quarto_id, caracteristica_id, created_at, updated_at)
			VALUES ('${quarto_id}', '${caracteristica_id}', now(), now());
		`
		return await sequelize.query(sql, {
			type: sequelize.QueryTypes.INSERT
		});
	} catch (error) {
		console.log(error);
		throw error;
	}
};
exports.deleteCaracteristica = async (quarto_id, caracteristica_id) => {
	try {
        const sql = `
			DELETE FROM "Caracteristica_Quartos"
			WHERE "quarto_id" = '${quarto_id}' and "caracteristica_id" = '${caracteristica_id}';
		`
		return sequelize.query(sql, {
			type: sequelize.QueryTypes.DELETE
		})
	} catch (error) {
		console.log(error);
		throw error;
	}
};