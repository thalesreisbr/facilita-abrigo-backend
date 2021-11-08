const status = require("http-status");
const entity = require("../models/Quarto");
const EstadiaDAO = require("../DAO/EstadiaDAO");
const GenericDAO = require("../DAO/GenericDAO");
const UsuarioService = require("./UsuarioService");

const Role = require('../../helpers/enums/Role');

exports.findByPk = async (id) => {
    return EstadiaDAO.findByPk(id);
    
};
exports.findAll = async () => {
    return EstadiaDAO.findAll();
    
};