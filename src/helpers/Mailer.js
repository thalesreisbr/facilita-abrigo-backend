const path = require('path')
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const transport = nodemailer.createTransport({ 
    host: process.env.EMAIL_HOST, 
    port: process.env.EMAIL_PORT,
    secure: false, 
    auth: { 
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    },
    pool: true,
    maxConnections: 1,
    rateDelta: 20000,
    rateLimit: 5,
});

transport.verify(function(error, success) {
    if (error) {
        console.log(`
            Não foi possível realizar a conexão SMTP.
            Por favor, verifique suas credenciais...

            ${error}
        `);
    } else {
        console.log("Conexão SMTP Estabelecida com sucesso!");
    }
  });

transport.use('compile', hbs({
    viewEngine: {
        extName: '.html',
        partialsDir: path.resolve('./src/resources/templates/mails'),
        layoutsDir: path.resolve('./src/resources/templates/mails'),
        defaultLayout: null,
    },
    viewPath: path.resolve('./src/resources/templates/mails'),
    extName: '.html'
}));

module.exports = transport;