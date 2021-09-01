const express = require("express");
const routes = express.Router();
const { AUTH,ADM,REFRESH, RECOVERY } = require('./middlewares/Autorizacao');
const {UPLOAD} = require('./middlewares/UploadFiles');
const Exemplo = require("./controllers/ExemploController");
const Usuario = require('./controllers/UsuarioController');
const InstituicaoController = require('./controllers/InstituicaoController');
const Abrigo = require('./controllers/AbrigoController');
const QuartoController = require('./controllers/QuartoController');



routes.post("/api/instituicoes", InstituicaoController.create);
routes.get("/api/instituicoes/:id", InstituicaoController.findByPk);
routes.get("/api/instituicoes/paginate", InstituicaoController.findAllWithPagination);
routes.get("/api/instituicoes", InstituicaoController.findAll);
routes.put("/api/instituicoes/:id", InstituicaoController.update);
routes.delete("/api/instituicoes/:id", InstituicaoController.delete);



routes.post("/api/abrigos", Abrigo.create);
routes.get("/api/abrigo/:id", Abrigo.findByPk);
routes.get("/api/abrigo/paginate", Abrigo.findAllWithPagination);
routes.get("/api/abrigo", Abrigo.findAll);
routes.put("/api/abrigo/:id", Abrigo.update);
routes.delete("/api/abrigo/:id", Abrigo.delete);


routes.post("/api/quartos", QuartoController.create);
routes.get("/api/quartos/:id", QuartoController.findByPk);
routes.get("/api/quartos/paginate", QuartoController.findAllWithPagination);
routes.get("/api/quartos", QuartoController.findAll);
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
// routes.post("/api/usuario/login",REFRESH, Usuario.autenticar);
// routes.post("/api/usuario/recuperar_senha", Usuario.recuperarSenha);
// routes.post("/api/usuario/redefinir_renha",RECOVERY, Usuario.redefinirSenha);
// routes.get("/api/usuario/all", Usuario.buscarTudoSemPaginacao);
// routes.get("/api/usuario/email", Usuario.buscarPeloEmail);
// routes.get("/api/usuario/:id",AUTH, Usuario.buscarUm);
// routes.get("/api/usuario", Usuario.buscarTudo);
// routes.put("/api/usuario/:id",AUTH, Usuario.atualizar);
// routes.delete("/api/usuario/:id", Usuario.excluir);
// routes.delete("/api/usuario/parcialmente/:id", Usuario.excluirParcialmente);

module.exports = routes;
