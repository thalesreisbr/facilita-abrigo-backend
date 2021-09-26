const status = require('http-status');

exports.status404 = (req, res, next) => {
    res.status(status.NOT_FOUND).send(); 
}

exports.status500 = (error, req, res, next) => {
    
    if(error.message){
        res.status(status.INTERNAL_SERVER_ERROR).json({message}); 
    }else{
        res.status(error.status).json({msg:error.msg}); 
    }
    
        
     
    
    console.log({ error });
}