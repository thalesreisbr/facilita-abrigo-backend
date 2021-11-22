
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const status = require('./middlewares/Status');
const path = require('path');

const { log } = require('./middlewares/AccessLog.js');

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger_output.json')

class AppController {
    constructor() {
        this.express = express();

        
        //Middlewares
        this.express.use(express.json());
        this.express.use(express.urlencoded({extended: true}));
        // let corsOption = {
        //     origin: ['http://localhost:4200', 'http://localhost:9000']
        // };

        // this.express.use(cors(corsOption));
        //this.express.use(autorizacao.global);
        this.express.use(log);
        this.express.use(routes);
        this.express.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
        this.express.use('/images', express.static(path.resolve(__dirname, 'uploads', 'images')));
        this.express.use(status.status404);
        this.express.use(status.status500);

        
        
    }
}

module.exports = new AppController().express;