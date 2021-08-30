module.exports = {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
    pool: true,
    maxConnections: 1,
    rateDelta: 20000,
    rateLimit: 5,
};