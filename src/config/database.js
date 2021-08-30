'use strict';
require('dotenv').config();
const Sequelize = require('sequelize');

const environment = process.env.NODE_ENV || 'development';
const config = require('./config.json')[environment];
const connection = new Sequelize(config);

const Address = require('../models/Address');
const Exemplo = require('../models/Exemplo');
const Instituicoes = require('../models/Instituicoes');
const Abrigos = require('../models/Abrigos');
const Quartos = require('../models/Quartos');

Address.init(connection);
Exemplo.init(connection);
Instituicoes.init(connection);
Abrigos.init(connection);
Quartos.init(connection);

console.log(connection.models);

Address.associate(connection);
Exemplo.associate(connection.models);
Abrigos.associate(connection.models);
Quartos.associate(connection.models);


module.exports = connection;