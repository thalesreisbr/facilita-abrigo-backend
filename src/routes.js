const express = require("express");
const routes = express.Router();
const { AUTH,ADM,REFRESH, RECOVERY } = require('./middlewares/Autorizacao');
const {UPLOAD} = require('./middlewares/UploadFiles');
const Exemplo = require("./api/controllers/ExemploController");
const Usuario = require('./api/controllers/UsuarioController');
const InstituicaoController = require('./api/controllers/InstituicaoController');
const Abrigo = require('./api/controllers/AbrigoController');
const QuartoController = require('./api/controllers/QuartoController');



routes.post("/api/instituicoes", AUTH, InstituicaoController.create);
routes.get("/api/instituicoes/notAproved", AUTH, ADM, InstituicaoController.findInstituicoesNotAprove);
routes.get("/api/instituicoes/paginate", AUTH, InstituicaoController.findAllWithPagination);
routes.get("/api/instituicoes/:id",AUTH, InstituicaoController.findByPk);
routes.get("/api/instituicoes", AUTH, InstituicaoController.findAll);
routes.patch("/api/instituicoes/aprovar", AUTH, ADM, InstituicaoController.aprovar);
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
routes.get("/api/quartos/:id", AUTH, QuartoController.findByPk);
routes.get("/api/quartos/paginate", AUTH, QuartoController.findAllWithPagination);
routes.get("/api/quartos", AUTH, QuartoController.findAll);
routes.put("/api/quartos/:id", QuartoController.update);
routes.delete("/api/quartos/:id", QuartoController.delete);




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
// routes.put("/api/usuario/:id",AUTH, Usuario.atualizar);
// routes.delete("/api/usuario/:id", Usuario.excluir);
// routes.delete("/api/usuario/parcialmente/:id", Usuario.excluirParcialmente);

module.exports = routes;
