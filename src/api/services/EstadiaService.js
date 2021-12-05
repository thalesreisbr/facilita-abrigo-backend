const status = require("http-status");
const entity = require("../models/Estadia");
const EstadiaDAO = require("../DAO/EstadiaDAO");
const GenericService = require("../services/GenericService");
const QuartoService = require("../services/QuartoService");
const Role = require('../../helpers/enums/Role');
const UsuarioService = require("../models/Usuario");

exports.create = async (body, usuario_id) => {
    try{ 
        let {data_inicio, quarto_id} = body;

        let usuario = await UsuarioService.findByPk(usuario_id);

        if(usuario.instituicao_id && usuario.role > Role.NOTHING){
            body.instituicao_id = usuario.instituicao_id;
        }

        const quarto = await QuartoService.findByPk(quarto_id);

        if(quarto.length == 0){
            throw {status:status.INTERNAL_SERVER_ERROR, msg:"Quarto não existe"};
        }

        // const quartosDisponiveis = await QuartoService.filtrar(data_inicio, quarto.abrigo.cidade)

        // quartosDisponiveis.filter( function(item){
        //     return item.id == quarto_id;
        // });

        // if(temVaga.length){
            return await GenericService.create(entity, body);
        // }else{
        //     throw {status:status.INTERNAL_SERVER_ERROR, msg:"Quarto não esta vago para este periodo "};
        // }

        
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