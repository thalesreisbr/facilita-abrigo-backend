const status = require('http-status');

exports.status404 = (error,req, res, next) => {
    res.status(status.NOT_FOUND).send(error); 
}

exports.status500 = (error, req, res, next) => {
   
    
    res.status(status.INTERNAL_SERVER_ERROR).json({error})

    // if(error.message){
    //     res.status(status.INTERNAL_SERVER_ERROR).json({}); 
    // }else{
    //     res.status(error.status).json({msg:error.msg}); 
    // }
    
        
     
    
    console.log({ error });
}