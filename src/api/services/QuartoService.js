const status = require("http-status");
const entity = require("../models/Quarto");
const QuartoDAO = require("../DAO/QuartoDAO");
const GenericDAO = require("../DAO/GenericDAO");
const UsuarioService = require("../services/UsuarioService");

const Role = require('../../helpers/enums/Role');

exports.addCaracteristica = async (usuario_id, quarto_id, caracteristicas_ids) => {
    try{
        let usuario = await UsuarioService.findByPk(usuario_id);

        let quarto = await this.findByPk(quarto_id);

        if(!((usuario.role == Role.OWNER && usuario.abrigo_id == quarto.abrigo.id) || (usuario.role  == Role.ADM))){
            throw {status:status.INTERNAL_SERVER_ERROR, msg:"sem permissao"};
        }

        await quarto.Caracteristicas.map(function(item){
            caracteristicas_ids.map(async function(caract){
                if(item.id == caract){
                    throw {status:status.INTERNAL_SERVER_ERROR, msg:"Já existe essa caracteristica de id "+ caract+"cadastrada neste quarto"};
                }else{
                    await QuartoDAO.addCaracteristica(quarto_id, caract);
                }
            });    
            
         });

        return await caracteristicas_ids;
        
    } catch (error) {
        console.log(error);
        throw error;
    }
    
    
};

exports.deleteCaracteristica = async (usuario_id, quarto_id, caracteristica_id) => {
    try{
        let usuario = await UsuarioService.findByPk(usuario_id);

        let quarto = await this.findByPk(quarto_id);

        if(!((usuario.role == Role.OWNER && usuario.abrigo_id == quarto.abrigo.id) || (usuario.role  == Role.ADM))){
            throw {status:status.INTERNAL_SERVER_ERROR, msg:"Sem permissao"};
        }

        let caracteristicaExiste = quarto.Caracteristicas.filter(function(item){
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
exports.filtrar = async (data_inicial, cidade) => {
    let quartosDisponiveis = await QuartoDAO.findByDisponibilidade(data_inicial);

    let quartos = [];

    for(let i =0; i<quartosDisponiveis.length; i++){
        quartos.push(await QuartoDAO.findByPk(quartosDisponiveis[i].id));
    }
    quartos  = await quartos.filter( function(item){
        return (item.abrigo.cidade = cidade);
    });
    return quartos;
};