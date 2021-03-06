const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

const logger = require('../config/logger')

const mongooseOpts = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
}

const dbConnection = () => {
  if (process.env.NODE_ENV !== 'test') {
    mongooseConnect()
  } else {
    connectMongoMemoryServer()
  }

  logger.info('Base de datos online')
}

const mongooseConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_CCN, mongooseOpts)
  } catch (error) {
    logger.error(error)
    throw new Error('Error al iniciar base de datos')
  }
}

const connectMongoMemoryServer = async () => {
  const mongod = new MongoMemoryServer()
  const uri = await mongod.getUri()
  await mongoose.connect(uri, mongooseOpts)
}

module.exports = {
  dbConnection,
}
