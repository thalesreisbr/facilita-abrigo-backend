
const database = require("../../config/database");
const entity = require("../models/Abrigado");
const Quarto = require('../models/Quarto');
const Usuario = require('../models/Usuario');
const Role = require("../../helpers/enums/Role");
const Estadia = require("../models/Estadia");
const Imagens = require('../models/Imagens');
const Abrigo = require("../models/Abrigo");
const Evento = require("../models/Evento");

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
							{
								model: Evento,
								as : "eventos"
							}
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
