const GenericDAO = require('../DAO/GenericDAO');
const AbrigosDAO = require('../DAO/AbrigoDAO');


exports.create = async (model, object) => {  
    return GenericDAO.create(model,object);
    
};



exports.create = async (model, object) => {  
    return GenericDAO.create(model,object);
    
};


exports.update = async (model, object, id) => {
    return GenericDAO.update(model,object,id);
    
};
exports.delete = async (model, id) => {
    return GenericDAO.destroy(model,id);
    
};

exports.findByPk = async (id) => {
    return AbrigosDAO.buscarUm(id);
    
};
exports.findAll = async (model) => {
    return GenericDAO.findAll(model);
    
};

exports.delete = async (model) => {
    return GenericDAO.delete(model, id);
}

exports.findAllWithPagination = async (model, limit, page) => {
    return GenericDAO.findAllWithPagination(model,limit, page);
     
};
exports.verifyIfExistsById = async (model, id) => {
    return model.findByPk(model,id);
};
