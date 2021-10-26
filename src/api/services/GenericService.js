const path = require('path');
const GenericDAO = require('../DAO/GenericDAO');

exports.create = async (model, object) => {  
    return GenericDAO.create(model,object);
    
};

exports.update = async (model, object, id) => {
    return GenericDAO.update(model,object,id);
    
};
exports.delete = async (model, id) => {
    return GenericDAO.delete(model,id);
    
};

exports.findByPk = async (model, id) => {
    return GenericDAO.findByPk(model,id);
    
};
exports.findAll = async (model) => {
    return GenericDAO.findAll(model);
};

exports.findAllWithPagination = async (model, limit, page) => {
    return GenericDAO.findAllWithPagination(model,limit, page);
     
};
exports.verifyIfExistsById = async (model, id) => {
    return model.findByPk(model,id);
};
