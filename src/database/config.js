const mongoose = require('mongoose');
const logger = require('../config/logger');

const dbConnection = async () => {

    try {
       await mongoose.connect(process.env.DB_CCN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        logger.info('Base de datos online');
    } catch (error) {
        logger.error(error);
        throw new Error('Error al iniciar base de datos');
    }
}

module.exports = {
    dbConnection
}