const express = require("express");
const routes = express.Router();
const { AUTH,ADM,REFRESH, RECOVERY } = require('./middlewares/Autorizacao');
const {UPLOAD} = require('./middlewares/UploadFiles');
const Exemplo = require("./api/controllers/ExemploController");
const Usuario = require('./api/controllers/UsuarioController');
const InstituicaoController = require('./api/controllers/InstituicaoController');
const Abrigo = require('./api/controllers/AbrigoController');
const QuartoController = require('./api/controllers/QuartoController');
const CaracteristicaController = require('./api/controllers/CaracteristicaController');
const ImagensController = require('./api/controllers/ImagensController');
const EstadiaController = require('./api/controllers/EstadiaController');
const AbrigadoController = require('./api/controllers/AbrigadoController');


routes.post("/api/instituicoes", AUTH, InstituicaoController.create);
routes.get("/api/instituicoes/notAproved", AUTH, ADM, InstituicaoController.findInstituicoesNotAprove);
routes.get("/api/instituicoes/paginate", AUTH, InstituicaoController.findAllWithPagination);
routes.get("/api/instituicoes/:id",AUTH, InstituicaoController.findByPk);
routes.get("/api/instituicoes", AUTH, InstituicaoController.findAll);
routes.patch("/api/instituicoes/aprovar", AUTH, ADM, InstituicaoController.aprovar);
routes.patch("/api/instituicoes/aprovarUsuario", AUTH, InstituicaoController.aprovarUsuario);
routes.patch("/api/instituicoes/solicitar",AUTH, InstituicaoController.solicitarMembro)
routes.put("/api/instituicoes/:id", AUTH, InstituicaoController.update);
routes.delete("/api/instituicoes/:id", AUTH, InstituicaoController.delete);


routes.post("/api/abrigo", AUTH, Abrigo.create);
routes.get("/api/abrigo/usuarioNaoAprovados", AUTH, Abrigo.findUsuariosNaoAprovadosById)
routes.get("/api/abrigo/paginate", AUTH, Abrigo.findAllWithPagination);
//routes.get("/api/abrigo/:id",AUTH, Abrigo.findUsuariosNaoAprovadosById);
routes.get("/api/abrigo/:id",AUTH, Abrigo.findByPk);
routes.get("/api/abrigo", AUTH, Abrigo.findAll);
routes.patch("/api/abrigo/aprovar", AUTH, ADM,Abrigo.aprovarCriacao);
routes.patch("/api/abrigo/aprovarUsuario", AUTH, Abrigo.aprovarUsuario);
routes.patch("/api/abrigo/solicitar",AUTH, Abrigo.solicitarMembro);
routes.put("/api/abrigo/:id",AUTH, Abrigo.update);
routes.delete("/api/abrigo/:id",AUTH, Abrigo.delete);


routes.post("/api/quartos", AUTH, QuartoController.create);
routes.post("/api/quartos/:id/caracteristica", AUTH, QuartoController.addCaracteristica);
routes.delete("/api/quartos/:id/caracteristica", AUTH, QuartoController.deleteCaracteristica);
routes.get("/api/quartos/paginate", AUTH, QuartoController.findAllWithPagination);
routes.get("/api/quartos/filtrar", AUTH, QuartoController.filtrar);
routes.get("/api/quartos", AUTH, QuartoController.findAll);
routes.get("/api/quartos/:id", AUTH, QuartoController.findByPk);
routes.put("/api/quartos/:id", QuartoController.update);
routes.delete("/api/quartos/:id", QuartoController.delete);


//Rotas para o controlador exemplo
routes.post("/api/caracteristica", AUTH, CaracteristicaController.create);
routes.get("/api/caracteristica/paginate",AUTH, CaracteristicaController.findAllWithPagination);
routes.get("/api/caracteristica/:id",AUTH, CaracteristicaController.findByPk);
routes.get("/api/caracteristica", AUTH, CaracteristicaController.findAll);
routes.put("/api/caracteristica/:id", AUTH, CaracteristicaController.update);
routes.delete("/api/caracteristica/:id", AUTH, CaracteristicaController.delete);

//Rotas para o controlador exemplo
routes.post("/api/imagens",AUTH, UPLOAD, ImagensController.create);
routes.get("/api/imagens/paginate",AUTH, ImagensController.findAllWithPagination);
routes.get("/api/imagens/:id", AUTH,ImagensController.findByPk);
routes.get("/api/imagens",AUTH, ImagensController.findAll);
routes.put("/api/imagens/:id", ImagensController.update);
routes.delete("/api/imagens/:id", ImagensController.delete);


//Rotas para o controlador exemplo
routes.post("/api/estadia",AUTH, EstadiaController.create);
routes.get("/api/estadia/paginate",AUTH, EstadiaController.findAllWithPagination);
routes.get("/api/estadia",AUTH, EstadiaController.findAll);
routes.get("/api/estadia/:id",AUTH, EstadiaController.findByPk);
routes.put("/api/estadia/:id",AUTH, EstadiaController.update);
routes.delete("/api/estadia/:id",AUTH, EstadiaController.delete);


//Rotas para o controlador exemplo
routes.post("/api/abrigado",AUTH, AbrigadoController.create);
routes.get("/api/abrigado/paginate",AUTH, AbrigadoController.findAllWithPagination);
routes.get("/api/abrigado",AUTH, AbrigadoController.findAll);
routes.get("/api/abrigado/:id",AUTH, AbrigadoController.findByPk);
routes.put("/api/abrigado/:id",AUTH, AbrigadoController.update);
routes.delete("/api/abrigado/:id",AUTH, AbrigadoController.delete);


// //Rotas para o controlador exemplo
// routes.post("/api/ex", Exemplo.create);
// routes.get("/api/ex/:id", Exemplo.findByPk);
// routes.get("/api/ex/paginate", Exemplo.findAllWithPagination);
// routes.get("/api/ex", Exemplo.findAll);
// routes.put("/api/ex/:id", Exemplo.update);
// routes.delete("/api/ex/:id", Exemplo.delete);


routes.post("/api/usuario", Usuario.create);
routes.post("/api/usuario/login",REFRESH, Usuario.login);
// routes.post("/api/usuario/recuperar_senha", Usuario.recuperarSenha);
// routes.post("/api/usuario/redefinir_renha",RECOVERY, Usuario.redefinirSenha);
// routes.get("/api/usuario/all", Usuario.buscarTudoSemPaginacao);
// routes.get("/api/usuario/email", Usuario.buscarPeloEmail);
routes.get("/api/usuario/:id",AUTH, Usuario.buscarUm);
// routes.get("/api/usuario", Usuario.buscarTudo);
routes.put("/api/usuario/:id",AUTH, Usuario.atualizar);
// routes.delete("/api/usuario/:id", Usuario.excluir);
// routes.delete("/api/usuario/parcialmente/:id", Usuario.excluirParcialmente);

module.exports = routes;
