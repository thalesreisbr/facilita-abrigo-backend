const status = require('http-status');

exports.status404 = (req, res, next) => {
    res.status(status.NOT_FOUND).send(); 
}

exports.status500 = (error, req, res, next) => { 
    res.status(status.INTERNAL_SERVER_ERROR).json({error}); 
    console.log({ error });
}