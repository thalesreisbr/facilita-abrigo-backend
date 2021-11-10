const status = require("http-status");
const entity = require("../models/Quarto");
const QuartoDAO = require("../DAO/QuartoDAO");
const GenericDAO = require("../DAO/GenericDAO");
const UsuarioService = require("../services/UsuarioService");

const Role = require('../../helpers/enums/Role');


exports.findAll = async () => {
    return await QuartoDAO.findAll();
}

exports.addCaracteristica = async (usuario_id, quarto_id, caracteristicas_ids) => {
    try{
        let usuario = await UsuarioService.findByPk(usuario_id);

        let quarto = await this.findByPk(quarto_id);

        if(!((usuario.role == Role.MEMBER && usuario.abrigo_id == quarto.abrigo.id)
                || (usuario.role == Role.OWNER && usuario.abrigo_id == quarto.abrigo.id) 
                || (usuario.role  == Role.ADM))){
            throw {status:status.INTERNAL_SERVER_ERROR, msg:"sem permissao"};
        }
        let trow = false;
        if(quarto.caracteristicas.length!=0){
            caracteristicas_ids.map(async function(caract){
                await quarto.caracteristicas.map(function(item){
                    if(item.id == caract){
                        trow =  {status:status.INTERNAL_SERVER_ERROR, msg:"Já existe essa caracteristica de id "+ caract+"cadastrada neste quarto"};
                    }
                });
                if(!trow)    
                    await QuartoDAO.addCaracteristica(quarto_id, caract);
             });
        }else{
            caracteristicas_ids.map(async function(caract){
                    await QuartoDAO.addCaracteristica(quarto_id, caract);
            });    
        }
        if(trow)
            throw trow;

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

        if(!((usuario.role == Role.MEMBER && usuario.abrigo_id == quarto.abrigo.id)
                || (usuario.role == Role.OWNER && usuario.abrigo_id == quarto.abrigo.id) 
                || (usuario.role  == Role.ADM))){
            throw {status:status.INTERNAL_SERVER_ERROR, msg:"Sem permissao"};
        }

        let caracteristicaExiste = quarto.caracteristicas.filter(function(item){
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
exports.filtrar = async (data_inicio, data_final, cidade, caracteristicas) => {
    try{
        let quartosDisponiveis = await QuartoDAO.findByDisponibilidadeAndCidade(data_inicio,data_final, cidade);

        let quartos = [];

        let quartoParaVerificar;

        let aux;
        for(let i =0; i<quartosDisponiveis.length; i++){
            quartoParaVerificar = await QuartoDAO.findByPk(quartosDisponiveis[i].id);
            aux = true;
            if(caracteristicas){
                caracteristicas.map( function(caracAdd){
            
                    if(aux.length == 0){
                    
                    }else{
        
                        aux = quartoParaVerificar.caracteristicas.filter( function(item){
                            return item.id == caracAdd;
                        });
                    }
                    
                })
            }
        
            if(aux.length!=0){
                quartos.push(quartoParaVerificar);
            }

        }
        if(cidade){
            quartos  = await quartos.filter( function(item){
                return (item.abrigo.cidade = cidade);
            });
        }
        
    return quartos;
    }catch (error) {
        console.log(error)
        throw error;
    }

    
};