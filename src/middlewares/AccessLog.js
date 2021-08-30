const { date, time } = require('../helpers/DataHoraAtual.js')

module.exports = {

    log: function log(req, res, next) {
        console.log(`[${date()} ${time()}] Origin: ${req.headers.origin}. Route: ${req.method} - ${req.url}`);
        next();
    }
}