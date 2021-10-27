const AbrigadoDAO = require("../DAO/AbrigadoDAO");

exports.findByPk = async (id) => {
    return AbrigadoDAO.findByPk(id);
    
};
