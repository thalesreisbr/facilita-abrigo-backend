
const database = require("../../config/database");
const entity = require("../models/Abrigado");
const Quarto = require('../models/Quarto');
const Usuario = require('../models/Usuario');
const Role = require("../../helpers/enums/Role");
const Estadia = require("../models/Estadia");
const Imagens = require('../models/Imagens');
const Abrigo = require("../models/Abrigo");

exports.findByPk = async (id) => {
	try {

		const instancia = await entity.findByPk(id,{
			include: 
				[{
					model: Estadia,
					as: "estadias",
					include: 
						[
							{
							model: Quarto,
							as:"quarto",
							include:[
								{
									model: Abrigo,
									as: "abrigo",
								},
							],
						},
						]
				},
			]
			
		});
		return (instancia ? instancia : null);

	} catch (error) {
		console.log(error);
		throw error;
	}
};
