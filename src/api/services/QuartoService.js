const status = require("http-status");
const entity = require("../models/Quarto");
const QuartoDAO = require("../DAO/QuartoDAO");
const GenericDAO = require("../DAO/GenericDAO");
const UsuarioService = require("../services/UsuarioService");

const Role = require('../../helpers/enums/Role');


exports.findAll = async () => {
    return await QuartoDAO.findAll();
}

/* Metodo divido em tres partes, if de verificao se tem permissão, segunda parte exclui quais devem ser excluidas 
e no terceiro add quais devem ser add */
exports.addCaracteristica = async (usuario_id, quarto_id, caracteristicas_ids) => {
    try{
        let usuario =  await UsuarioService.findByPk(usuario_id);

        let quarto = await this.findByPk(quarto_id);

        if(!((usuario.role == Role.MEMBER && usuario.abrigo_id == quarto.abrigo.id)
                || (usuario.role == Role.OWNER && usuario.abrigo_id == quarto.abrigo.id) 
                || (usuario.role  == Role.ADM))){
            throw {status:status.INTERNAL_SERVER_ERROR, msg:"sem permissao"};
        }

        let caractParaApagar;
        if(quarto.caracteristicas.length!=0){
            await quarto.caracteristicas.map(async function(item){
                caractParaApagar = await caracteristicas_ids.filter(carac => carac === item.id);
                // .filter(async function(caract){
                //      return (item.id === caract);
                // });

                //Se não existe novo vetor o usuario quis apagar
                
                if(caractParaApagar.length == 0){
                    await QuartoDAO.deleteCaracteristica(quarto_id, item.id);
                }
            });
        }

        let caractExiste = false;
        if(quarto.caracteristicas.length!=0){
            caracteristicas_ids.map(async function(caract){
                await quarto.caracteristicas.map(function(item){
                    if(item.id == caract){
                        caractExiste =  true;
                    }
                });
                if(!caractExiste){
                    await QuartoDAO.addCaracteristica(quarto_id, caract);
                    caractExiste = false;
                }else{
                    caractExiste = false;
                    // Se ela existe deve ser mandtida
                }
                    
             });
        }else{
            await caracteristicas_ids.map(async function(caract){
                    await QuartoDAO.addCaracteristica(quarto_id, caract);
            });    
        }

        quarto = await this.findByPk(quarto_id);

        return await quarto;
        
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
exports.filtrar = async (data_inicio, data_final, cidade, caracteristicas, abrigo_id) => {
    try{
        let quartosDisponiveis;
        if((!data_inicio || data_inicio == 'null') && cidade != 'null' && abrigo_id== null){
            quartosDisponiveis = await QuartoDAO.findByCidade(cidade);
        }else if(abrigo_id && abrigo_id != 'null'){
                if((!data_inicio || data_inicio == 'null')){
                    quartosDisponiveis = await QuartoDAO.findByAbrigo(abrigo_id);
                }else{
                    quartosDisponiveis =  await QuartoDAO.findByDisponibilidadeAndAbrigo_id(data_inicio,data_final, abrigo_id);
                }
            
            }else{
                if(cidade && cidade!= 'null'){
                    quartosDisponiveis = await QuartoDAO.findByDisponibilidadeAndCidade(data_inicio,data_final, cidade);
                }else{
                    quartosDisponiveis = await QuartoDAO.findByDisponibilidade(data_inicio,data_final);
                }
            }

        let quartos = [];

        let quartoParaVerificar;

        let aux;
        for(let i =0; i<quartosDisponiveis.length; i++){
            quartoParaVerificar = await QuartoDAO.findByPk(quartosDisponiveis[i].id);
            aux = true;
            if(caracteristicas && caracteristicas !=null){
                caracteristicas.map( function(caracAdd){
            
                    if(aux.length != 0){
                        aux = quartoParaVerificar.caracteristicas.filter( function(item){
                            return item.id == caracAdd;
                        });
                    }
                    
                })
                if(aux.length!=0){
                    quartos.push(quartoParaVerificar);
                }
            }else{
                quartos.push(quartoParaVerificar);
            }
        
            

        }
        // if(cidade){
        //     quartos  = await quartos.filter( function(item){
        //         return (item.abrigo.cidade = cidade);
        //     });
        // }
        
    return quartos;
    }catch (error) {
        console.log(error)
        throw error;
    }

    
};