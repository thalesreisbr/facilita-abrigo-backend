const express = require("express");
const routes = express.Router();
const { AUTH,ADM,REFRESH, RECOVERY } = require('./middlewares/Autorizacao');
const {UPLOAD} = require('./middlewares/UploadFiles');
const Exemplo = require("./controllers/ExemploController");
const Usuario = require('./controllers/UsuarioController');
const Instituicoes = require('./controllers/InstituicoesController');
const Abrigos = require('./controllers/AbrigosController');
const Quartos = require('./controllers/QuartosController');



routes.post("/api/instituicoes", Instituicoes.create);
routes.get("/api/instituicoes/:id", Instituicoes.findByPk);
routes.get("/api/instituicoes/paginate", Instituicoes.findAllWithPagination);
routes.get("/api/instituicoes", Instituicoes.findAll);
routes.put("/api/instituicoes/:id", Instituicoes.update);
routes.delete("/api/instituicoes/:id", Instituicoes.delete);



routes.post("/api/abrigos", Abrigos.create);
routes.get("/api/abrigos/:id", Abrigos.findByPk);
routes.get("/api/abrigos/paginate", Abrigos.findAllWithPagination);
routes.get("/api/abrigos", Abrigos.findAll);
routes.put("/api/abrigos/:id", Abrigos.update);
routes.delete("/api/abrigos/:id", Abrigos.delete);


routes.post("/api/quartos", Quartos.create);
routes.get("/api/quartos/:id", Quartos.findByPk);
routes.get("/api/quartos/paginate", Quartos.findAllWithPagination);
routes.get("/api/quartos", Quartos.findAll);
routes.put("/api/quartos/:id", Quartos.update);
routes.delete("/api/quartos/:id", Quartos.delete);




//Rotas para o controlador exemplo
routes.post("/api/ex", Exemplo.create);
routes.get("/api/ex/:id", Exemplo.findByPk);
routes.get("/api/ex/paginate", Exemplo.findAllWithPagination);
routes.get("/api/ex", Exemplo.findAll);
routes.put("/api/ex/:id", Exemplo.update);
routes.delete("/api/ex/:id", Exemplo.delete);


routes.post("/api/usuario", Usuario.cadastrar);
routes.post("/api/usuario/login",REFRESH, Usuario.autenticar);
routes.post("/api/usuario/recuperar_senha", Usuario.recuperarSenha);
routes.post("/api/usuario/redefinir_renha",RECOVERY, Usuario.redefinirSenha);
routes.get("/api/usuario/all", Usuario.buscarTudoSemPaginacao);
routes.get("/api/usuario/email", Usuario.buscarPeloEmail);
routes.get("/api/usuario/:id",AUTH, Usuario.buscarUm);
routes.get("/api/usuario", Usuario.buscarTudo);
routes.put("/api/usuario/:id",AUTH, Usuario.atualizar);
routes.delete("/api/usuario/:id", Usuario.excluir);
routes.delete("/api/usuario/parcialmente/:id", Usuario.excluirParcialmente);

module.exports = routes;
