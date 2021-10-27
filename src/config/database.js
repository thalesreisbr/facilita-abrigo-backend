'use strict';
require('dotenv').config();
const Sequelize = require('sequelize');

const environment = process.env.NODE_ENV || 'development';
const config = require('./config.json')[environment];
const connection = new Sequelize(config);

const Exemplo = require('../api/models/Exemplo');
const Instituicao = require('../api/models/Instituicao');
const Abrigo = require('../api/models/Abrigo');
const Quarto = require('../api/models/Quarto');
const Usuario = require('../api/models/Usuario')
const Caracteristica = require('../api/models/Caracteristica');
const Caracteristica_Quartos = require('../api/models/Caracteristica_Quartos');
const Imagens = require('../api/models/Imagens');
const Estadia = require('../api/models/Estadia');
const Abrigado = require('../api/models/Abrigado');

Exemplo.init(connection);
Instituicao.init(connection);
Abrigo.init(connection);
Quarto.init(connection);
Usuario.init(connection);
Caracteristica.init(connection);
Caracteristica_Quartos.init(connection);
Imagens.init(connection);
Estadia.init(connection);
Abrigado.init(connection);

Exemplo.associate(connection.models);
Abrigo.associate(connection.models);
Quarto.associate(connection.models);
Usuario.associate(connection.models);
Instituicao.associate(connection.models);
Caracteristica.associate(connection.models);
Imagens.associate(connection.models);
Estadia.associate(connection.models);
Abrigado.associate(connection.models);

module.exports = connection;