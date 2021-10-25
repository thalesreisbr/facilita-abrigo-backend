const status = require("http-status");
const entity = require("../models/Quarto");
const QuartoDAO = require("../DAO/QuartoDAO");
const GenericDAO = require("../DAO/GenericDAO");
const UsuarioService = require("../services/UsuarioService");

const Role = require('../../helpers/enums/Role');

exports.addCaracteristica = async (usuario_id, quarto_id, caracteristica_id) => {
    try{
        usuario = await UsuarioService.findByPk(usuario_id);

        quarto = await this.findByPk(quarto_id);

        if(!((usuario.role == Role.OWNER && usuario.abrigo_id == quarto.abrigo.id) || (usuario.role  == Role.ADM))){
            throw {status:status.INTERNAL_SERVER_ERROR, msg:"sem permissao"};
        }

        quarto.Caracteristicas.map(function(item){
            if(item.id == caracteristica_id){
                throw {status:status.INTERNAL_SERVER_ERROR, msg:"Já existe essa caracteristica cadastrada neste quarto"};
            }
            
         })

        new_Caracteristica_Quartos = {
            quarto_id: quarto_id,
            caracteristica_id:caracteristica_id
        };
        return await QuartoDAO.addCaracteristica(quarto_id, caracteristica_id);
        
    } catch (error) {
        throw error;
    }
    
    
};

exports.deleteCaracteristica = async (usuario_id, quarto_id, caracteristica_id) => {
    try{
        usuario = await UsuarioService.findByPk(usuario_id);

        quarto = await this.findByPk(quarto_id);

        if(!((usuario.role == Role.OWNER && usuario.abrigo_id == quarto.abrigo.id) || (usuario.role  == Role.ADM))){
            throw {status:status.INTERNAL_SERVER_ERROR, msg:"Sem permissao"};
        }

        caracteristicaExiste = quarto.Caracteristicas.filter(function(item){
            return item.id == caracteristica_id;});

        if(caracteristicaExiste.length){
            return await QuartoDAO.deleteCaracteristica(quarto_id, caracteristica_id);
        }else{
            throw {status:status.INTERNAL_SERVER_ERROR, msg:"Não existe essa caracteristica nesse quarto"};
        }
        
        
        
    } catch (error) {
        console.log(error)
        throw error;
    }
    
    
};

exports.findByPk = async (id) => {
    return QuartoDAO.findByPk(id);
    
};
exports.filtrar = async (data_inicial) => {
    return QuartoDAO.findByDisponibilidade(data_inicial);
    
};