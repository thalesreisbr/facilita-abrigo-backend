const status = require("http-status");
const JWT = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const { default: SignJWT } = require('jose/jwt/sign')
const {getPrivateKey,getRecoveryKey,getRefreshKey} = require("../../config/keys");
const DAO = require('../DAO/UsuarioDAO');
const mailer= require('../../helpers/Mailer');
const {cpf} = require('cpf-cnpj-validator');
const usuarioService = require('../services/UsuarioService');
const Role = require("../../helpers/enums/Role");


//Adiciona uma nova instancia da entidade.
exports.create = async (request, response, next) => {
    try {
        response =  await usuarioService.create(request, response, next);

        return response;
    } catch (error) {
        next(error)
    }
	
};

//Realiza o autencicação do usuário, fornecendo-lhe o token caso seja um usuário autêntico.
exports.login = async (request, response, next) => {
    try {
        await usuarioService.login(request, response, next);
    } catch (error) {
        next(error);
    }
   
};

//Busca por uma instancia da entidade.
exports.buscarUm = async (request, response, next) => {
    //Essa comparação é que caso seja um usuario ele pode buscar só por ele mesmo e nao outros usuarios do sistema
	try {

		const instancia = await DAO.findByPk(request.params.id)
		return (instancia ? response.status(status.OK).send(instancia) : response.status(status.NOT_FOUND).send());

	} catch (error) { 
		next(error);
	}
};
//Busca por uma instancia da entidade.
exports.buscarPeloEmail = async (request, response, next) => {

	try {

		const instancia = await DAO.buscarPeloEmail(request.params.email)
		return (instancia ? response.status(status.OK).send(instancia) : response.status(status.NOT_FOUND).send());

	} catch (error) { 
		next(error);
	}
};

//Busca todas as instancias da entidade.
exports.buscarTudo = async (request, response, next) => {
	let { limite, pagina } = request.query;

	try {
		const instancias = await DAO.buscarTudo(limite, pagina)
		return response.status(status.OK).send(instancias);

	} catch (error) {
		next(error);
	}
};

//Busca todas as instancias da entidade sem paginação.
exports.buscarTudoSemPaginacao = async (request, response, next) => {
	try {

		const instancias = await DAO.buscarTudoSemPaginacao();
		return response.status(status.OK).send(instancias);

	} catch (error) {
		next(error);
	}
};

//Atualiza uma instancia da entidade.
exports.atualizar = async (request, response, next) => {
	const credenciais = request.body;
    let updated_id;
    
    if(!cpf.isValid(credenciais.cpf))
        return response.status(status.BAD_REQUEST).send({msg: 'Cpf inválido.'});

    if(request.usuario_id != request.params.id && request.role == Role.ADM){
        return response.status(status.BAD_REQUEST).send({msg: 'Usuário só pode pesquisar ele mesmo'});
    }
    if(request.body.senha){
        return response.status(status.BAD_REQUEST).send({msg: 'Não é permetido atualizar a senha por aqui'});
    }
    try {
        updated_id = await DAO.atualizar(request.params.id,credenciais)

        return (updated_id ? response.status(status.OK).send( updated_id ) : response.status(status.NOT_FOUND).send());
		
	} catch (error) {
		next(error);
	}
};

//Exclui uma instancia da entidade.
exports.excluir = async (request, response, next) => {
	try {

		const deleted_id = await DAO.excluir(request.params.id)
		return (deleted_id ? response.status(status.OK).send( deleted_id ) : response.status(status.NOT_FOUND).send());
		
	} catch (error) {
		next(error);
	}
};
//Apagar apenas alguns campos.
exports.excluirParcialmente = async (request, response, next) => {
	try {

		const deleted_id = await DAO.excluirParcialmente(request.params.id)
		return (deleted_id ? response.status(status.OK).send( deleted_id ) : response.status(status.NOT_FOUND).send());
		
	} catch (error) {
		next(error);
	}
};


//Dado um e-mail existente no sistema, retorna um token de recuperação de senha
exports.recuperarSenha =  (request, response, next) => {
    const { email } = request.body;

    try {
        DAO.buscarPeloEmail(email)
            .then(async (usuario) => {
                if (!usuario)
                   return response.status(status.NOT_FOUND).send({ error: 'Usuário não encontrado.' });

                const nome = usuario.nome;
                const privateKey = await getRecoveryKey();

                const recoveryToken = await new SignJWT({
                    id: usuario.id,
                    email: usuario.email,
                    nome: usuario.nome
                })
                .setProtectedHeader({alg: 'ES256'})
                .setExpirationTime('0.5h')
                .sign(privateKey);

                await DAO.atualizarTokenRecuperacao(usuario.id,recoveryToken);

                const link = "localhost:4200/recuperar-senha/?token="+recoveryToken;

                //E-mail para redefinição de senha
                mailer.sendMail({
                    to: email,
                    from: ' ',
                    subject: 'Vixting - Redefinição de senha',
                    template: 'recuperacaoSenhaUsuario',
                    context: { recoveryToken, nome },
                }, (error) => {
                    if (error) {
                        console.log(error);
                        response.status(status.BAD_REQUEST).send({ error: 'Não foi possível enviar o e-mail de recuperação. Por favor, tente mais tarde.' })
                    } else {
                        response.status(status.OK).send({ messagem: `E-mail de recuperação enviado para ${email}` })
                    }
                })
            })
            .catch((error) => next(error));
    } catch (error) {
        next(error);
    }
}
 

//Verifica se o token de recuperação pertence ao usuário e se ele é válido. Caso seja, realiza a troca da senha.
exports.redefinirSenha = (request, response, next) => {
    const { email, senha } = request.body;
    try {
        DAO.buscarPeloEmail(email).then(async (usuario) => {
            if (!usuario)
               return response.status(status.NOT_FOUND).send({ error: 'Usuário não encontrado.' });
            if(usuario.token_recuperacao == ""){
                return response.status(status.UNAUTHORIZED).send({ msg: 'A senha já foi alterada uma vez, emita um novo token para senhar ser alterada'});
            }      
            try {
                const salt = await bcrypt.genSalt();
                
                DAO.atualizarSenha(usuario.id,await bcrypt.hash(senha, salt))
                    .then(() => {

                        //E-mail para aviso de seja redefinida
                        const nome = usuario.nome;
                        mailer.sendMail({
                            to: email,
                            from: ' ',
                            subject: 'Vixting - Sua senha foi redefinida!',
                            template: 'recuperacaoSenhaUsuarioConfirmado',
                            context: { nome },
                        })

                        response.status(status.OK).send({ messagem: `Senha redefinida!` });
                    })
                    .catch((error) => next(error));
                DAO.atualizarTokenRecuperacao(usuario.id,"");
            
            } catch (error) {
                return response.status(status.UNAUTHORIZED).send({ error: 'Token Invalido!' });
            }
        })
    } catch (error) {
        response.status(status.BAD_REQUEST).send({ error: 'Erro ao redefinir a senha. Por favor, tente novamente.' })
    }
} 
