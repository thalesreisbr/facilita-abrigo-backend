'use strict';
require('dotenv').config();
const Sequelize = require('sequelize');

const environment = process.env.NODE_ENV || 'development';
const config = require('./config.json')[environment];
const connection = new Sequelize(config);

const Exemplo = require('../models/Exemplo');
const Instituicao = require('../models/Instituicao');
const Abrigo = require('../models/Abrigo');
const Quarto = require('../models/Quarto');
const Usuario = require('../models/Usuario')

Exemplo.init(connection);
Instituicao.init(connection);
Abrigo.init(connection);
Quarto.init(connection);
Usuario.init(connection);

Exemplo.associate(connection.models);
Abrigo.associate(connection.models);
Quarto.associate(connection.models);
Usuario.associate(connection.models);


module.exports = connection;