const status = require("http-status");
const entity = require("../models/Imagens");
const QuartoDAO = require("../DAO/QuartoDAO");
const GenericDAO = require("../DAO/GenericDAO");
const UsuarioService = require("./UsuarioService");

const Role = require('../../helpers/enums/Role');
const Imagens = require("../models/Imagens");

exports.adicionarImagens = async (imagens, quarto_id) => {
    try{
        let body =[];
        
        imagens.map((file)=>{
            body.push({
                quarto_id:quarto_id,
                url :"/images/"+file.key
            });	
        });

        return await Imagens.bulkCreate(body);
        
    } catch (error) {
        console.log(error);
        throw error;
    }
    
}
