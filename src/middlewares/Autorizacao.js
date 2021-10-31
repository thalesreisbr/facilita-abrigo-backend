const status = require('http-status');
const JWT = require('jsonwebtoken');
const {getPrivateKey,getRefreshKey,getRecoveryKey} = require('../config/keys');
const Role = require('../helpers/enums/Role');

//Realiza a checagem da validade do token
exports.AUTH = async (request, response, next) => {
    const auth = request.headers.authorization;
    const privateKey = await getPrivateKey();

    //Verifica se existe uma autorização no header
    if (!auth)
        return response.status(status.UNAUTHORIZED).send({ erro: 'Nenhum token foi passado.' });

    const parts = auth.split(' ');

    //Verifica se o token possui duas partes
    if (!parts.length == 2)
        return response.status(status.UNAUTHORIZED).send({ erro: 'Token quebrado.' });

    const [prefix, token] = parts;

    //Verifica se o token possui o prefixo Bearer
    if(!/^Bearer$/i.test(prefix))
        return response.status(status.UNAUTHORIZED).send({ erro: 'Erro no formato do token.'});

    try {
        let decoded = JWT.verify(token, privateKey, { algorithms: ['ES256'] });
        request.usuario_id = decoded.usuario_id;
        request.role = decoded.role;
        return next();
    } catch (error) {
        return response.status(status.UNAUTHORIZED).send({ msg: 'Token Invalido!', error });
    }
};

//Realiza a checagem da validade do refresh_token, caso ele exista
exports.REFRESH = async (request, response, next) => {
    const auth = request.headers.authorization;
    
    //Verifica se existe um refresh_token no header
    if (!auth) return next()
    
    const parts = auth.split(' ');
    
    //Verifica se o refresh_token possui duas partes
    if (!parts.length == 2)
        return response.status(status.UNAUTHORIZED).send({ erro: 'refresh_token quebrado.' });
    
    const [prefix, refresh_token] = parts;
    
    //Verifica se o refresh_token possui o prefixo Bearer
    if(!/^Bearer$/i.test(prefix))
        return response.status(status.UNAUTHORIZED).send({ erro: 'Erro no formato do refresh_token.'});
    
    try {
        const refreshKey = await getRefreshKey();
        JWT.verify(refresh_token, refreshKey, { algorithms: ['ES256'] });
        request.refresh_token = refresh_token;
        return next();
    } catch (error) {
        request.refresh_token = undefined;
        return response.status(status.UNAUTHORIZED).send({ msg: 'Refresh Token Invalido!', error });
        // return next();
    }
};
//Realiza a checagem da validade do refresh_token, caso ele exista
exports.RECOVERY = async (request, response, next) => {
    const recovery_token = request.headers.recovery_token;
    
    //Verifica se existe um token no header
    if (!recovery_token) return response.status(status.BAD_REQUEST).send({ erro: 'Nenhum token foi passado.' });
    
    try {
        const recoveryKey = await getRecoveryKey();
        let decoded = JWT.verify(recovery_token, recoveryKey, { algorithms: ['ES256'] });
        request.body.email = decoded.email;
        return next();
    } catch (error) {
        return response.status(status.UNAUTHORIZED).send({ msg: 'Token Invalido!', error });
    }
};
exports.ADM = async (request, response, next) => {
    if(request.role = Role.ADM){
        return next();
    }else{
        return response.status(status.UNAUTHORIZED).send({ msg: 'Este Usuario Não pode ter acesso a essa rota'});

    }
}
