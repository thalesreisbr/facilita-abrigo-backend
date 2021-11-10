const status = require("http-status");
const entity = require("../models/Estadia");
const EstadiaDAO = require("../DAO/EstadiaDAO");
const GenericDAO = require("../DAO/GenericDAO");
const GenericService = require("../services/GenericService");
const QuartoService = require("../services/QuartoService");
const Role = require('../../helpers/enums/Role');

exports.create = async (body) => {
    try{ 
        let {data_inicio, quarto_id} = body;

        const quarto = await QuartoService.findByPk(quarto_id);

        if(quarto.length == 0){
            throw {status:status.INTERNAL_SERVER_ERROR, msg:"Quarto não existe"};
        }

        const quartosDisponiveis = await QuartoService.filtrar(data_inicio, quarto.abrigo.cidade)

        let temVaga = quartosDisponiveis.filter( function(item){
            return item.id == quarto_id;
        });

        if(temVaga.length){
            return await GenericService.create(entity, body);
        }else{
            throw {status:status.INTERNAL_SERVER_ERROR, msg:"Quarto não esta vago para este periodo "};
        }

        
    }catch (error) {
        console.log(error);
        throw error;
    }
};

exports.findByPk = async (id) => {
    return EstadiaDAO.findByPk(id);
    
};
exports.findAll = async (abrigo_id, instituicao_id) => {
    if(abrigo_id && instituicao_id){
        return EstadiaDAO.findByAbrigoAndInsituicao(abrigo_id, instituicao_id)
    }else if(abrigo_id){
        return EstadiaDAO.findByAbrigo(abrigo_id);
    }else if(instituicao_id) {
        return EstadiaDAO.findByInsituicao(instituicao_id);
    }else{
        return EstadiaDAO.findAll();
    }
    
    
};

exports.findByQuartoAndDate_final = async (quarto_id, data_final) => {
   
    
    
};